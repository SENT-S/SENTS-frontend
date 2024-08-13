'use strict';

import { createServer } from 'http';
import path from 'path';
import { parse } from 'url';

import { config } from 'dotenv';
import next from 'next';
import NodeCache from 'node-cache';
import { Server, Socket } from 'socket.io';

import { getAllCompanies, getAllCompanyNews } from './src/utils/apiClient';

config({ path: path.resolve(process.cwd(), '.env.local') });

interface AuthenticatedSocket extends Socket {
  token?: string;
}

const PORT = process.env.NEXT_PUBLIC_PORT || 3000;
const BASE_URL = process.env.NEXT_PUBLIC_URL || '';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Implement a more efficient cache with a max size
const cache = new NodeCache({ stdTTL: 300, maxKeys: 1000 });

async function getDataWithCache(token: string, dataType: 'companies' | 'news') {
  const cacheKey = `${dataType}_${token}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  const getData = dataType === 'companies' ? getAllCompanies : getAllCompanyNews;
  const data = await getData(token);

  cache.set(cacheKey, data);
  return data;
}

async function updateDataForSocket(socket: AuthenticatedSocket, dataType: 'companies' | 'news') {
  if (!socket.token) return;

  try {
    const data = await getDataWithCache(socket.token, dataType);
    socket.emit(`${dataType}Update`, data);
  } catch (error) {
    console.error(`Error fetching ${dataType} data:`, error);
  }
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const io = new Server(server, {
    pingTimeout: 60000,
    pingInterval: 25000,
    // Implement connection limits
    maxHttpBufferSize: 1e6, // 1 MB
    connectTimeout: 45000, // 45 seconds
  });

  // Implement a connection limit
  const MAX_CONNECTIONS = 1000;
  let connectionCount = 0;

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    if (token && connectionCount < MAX_CONNECTIONS) {
      socket.token = token;
      connectionCount++;
      next();
    } else if (connectionCount >= MAX_CONNECTIONS) {
      next(new Error('Server is at maximum capacity'));
    } else {
      next(new Error('Unauthorized connection'));
    }
  });

  io.on('connection', (socket: AuthenticatedSocket) => {
    console.log('A client connected');

    if (!socket.token) {
      console.error('Socket connected without a token');
      socket.disconnect();
      return;
    }

    // Send initial data
    updateDataForSocket(socket, 'companies');
    updateDataForSocket(socket, 'news');

    // Implement rate limiting
    const updateLimit = 5;
    let updateCount = 0;
    let lastUpdateTime = Date.now();

    const checkRateLimit = () => {
      const now = Date.now();
      if (now - lastUpdateTime > 60000) {
        // Reset after 1 minute
        updateCount = 0;
        lastUpdateTime = now;
      }
      if (updateCount >= updateLimit) {
        throw new Error('Rate limit exceeded');
      }
      updateCount++;
    };

    // Listen for company update requests
    socket.on('requestCompanyUpdate', async () => {
      try {
        checkRateLimit();
        if (!socket.token) return;
        const companies = await getAllCompanies(socket.token);
        cache.set(`companies_${socket.token}`, companies); // Update cache
        // broadcast to all clients
        io.emit('companiesUpdate', companies);
      } catch (error: any) {
        console.error('Error fetching company data:', error);
        socket.emit('error', { message: error.message });
      }
    });

    // Listen for news update requests
    socket.on('requestNewsUpdate', async () => {
      try {
        checkRateLimit();
        if (!socket.token) return;
        const news = await getAllCompanyNews(socket.token);
        cache.set(`news_${socket.token}`, news); // Update cache
        // broadcast to all clients
        io.emit('newsUpdate', news);
      } catch (error: any) {
        console.error('Error fetching news data:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
      connectionCount--;
    });
  });

  server.listen(PORT, () => {
    console.log(`> Ready on ${BASE_URL}`);
  });
});
