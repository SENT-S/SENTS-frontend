'use client';
import path from 'path';

import { config } from 'dotenv';
import { getSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

import { CustomSession } from '@/utils/types';

config({ path: path.resolve(process.cwd(), '.env.local') });

const BASE_URL = process.env.NEXT_PUBLIC_URL || '';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const connectSocket = async () => {
      const session = (await getSession()) as CustomSession;
      const socketIo = io(BASE_URL, {
        auth: {
          token: session?.token,
        },
      });
      setSocket(socketIo);

      return () => {
        socketIo.disconnect();
      };
    };

    connectSocket();
  }, []);

  const requestCompanyUpdate = useCallback(() => {
    if (socket) {
      socket.emit('requestCompanyUpdate');
    }
  }, [socket]);

  const requestNewsUpdate = useCallback(() => {
    if (socket) {
      socket.emit('requestNewsUpdate');
    }
  }, [socket]);

  return { socket, requestCompanyUpdate, requestNewsUpdate };
};
