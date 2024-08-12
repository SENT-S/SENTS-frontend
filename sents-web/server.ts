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

const cache = new NodeCache({ stdTTL: 5 });

async function getDataWithCache(token: string, dataType: 'companies' | 'news') {
  const cacheKey = `${dataType}_${token}`;
  const cachedData = cache.get(cacheKey);
  if (cachedData) return cachedData;

  let data;
  if (dataType === 'companies') {
    data = await getAllCompanies(token);
  } else {
    data = await getAllCompanyNews(token);
  }

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
  });

  io.use((socket: AuthenticatedSocket, next) => {
    const token = socket.handshake.auth.token;
    if (token) {
      socket.token = token;
      next();
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

    // Listen for company update requests
    socket.on('requestCompanyUpdate', async () => {
      try {
        if (!socket.token) return;
        const companies = await getDataWithCache(socket.token, 'companies');
        io.emit('companiesUpdate', companies);
      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    });

    // Listen for news update requests
    socket.on('requestNewsUpdate', async () => {
      try {
        if (!socket.token) return;
        const news = await getDataWithCache(socket.token, 'news');
        io.emit('newsUpdate', news);
      } catch (error) {
        console.error('Error fetching news data:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('A client disconnected');
    });
  });

  server.listen(PORT, () => {
    console.log(`> Ready on ${BASE_URL}`);
  });
});
