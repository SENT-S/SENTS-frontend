// server/socketServer.ts

import { Server as SocketIOServer } from 'socket.io';

import { getAllCompanies, getAllCompanyNews } from '../utils/apiClient';

let io: SocketIOServer | null = null;

const COMPANIES_REFRESH_INTERVAL = 300000; // 5 minutes
const NEWS_REFRESH_INTERVAL = 300000; // 5 minutes

const createIntervalRefresh = (socket: any, dataType: 'companies' | 'news', token: string) => {
  const fetchFunction = dataType === 'companies' ? getAllCompanies : getAllCompanyNews;
  const interval = dataType === 'companies' ? COMPANIES_REFRESH_INTERVAL : NEWS_REFRESH_INTERVAL;

  return setInterval(async () => {
    try {
      const data = await fetchFunction(token);
      socket.emit(`${dataType}Data`, data);
    } catch (error) {
      console.error(`Error fetching ${dataType}:`, error);
      socket.emit('error', `Failed to fetch ${dataType}`);
    }
  }, interval);
};

export const initSocketServer = (server: any) => {
  if (io) return io;

  io = new SocketIOServer(server, {
    path: '/api/socketio',
    addTrailingSlash: false,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    (socket as any).token = token;
    next();
  });

  io.on('connection', (socket: any) => {
    console.log('New client connected');

    const intervals: { [key: string]: NodeJS.Timeout } = {};

    const setupSubscription = async (dataType: 'companies' | 'news') => {
      try {
        const fetchFunction = dataType === 'companies' ? getAllCompanies : getAllCompanyNews;
        const data = await fetchFunction(socket.token);
        io?.emit(`${dataType}Data`, data);
        intervals[dataType] = createIntervalRefresh(socket, dataType, socket.token);
      } catch (error) {
        console.error(`Error fetching ${dataType}:`, error);
        socket.emit('error', `Failed to fetch ${dataType}`);
      }
    };

    socket.on('subscribeCompanies', () => setupSubscription('companies'));
    socket.on('subscribeCompanyNews', () => setupSubscription('news'));

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      Object.values(intervals).forEach(clearInterval);
    });
  });

  return io;
};

export const getSocketServer = () => io;
