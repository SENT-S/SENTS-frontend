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
    let socketIo: Socket | undefined;

    const connectSocket = async () => {
      const session = (await getSession()) as CustomSession | null;
      if (session?.token) {
        socketIo = io(BASE_URL, {
          auth: { token: session.token },
        });
        setSocket(socketIo);
      }
    };

    connectSocket();

    return () => {
      if (socketIo) {
        socketIo.disconnect();
      }
    };
  }, []);

  const requestUpdate = useCallback(
    (type: 'Company' | 'News') => {
      if (socket) {
        socket.emit(`request${type}Update`);
      }
    },
    [socket],
  );

  return {
    socket,
    requestCompanyUpdate: useCallback(() => requestUpdate('Company'), [requestUpdate]),
    requestNewsUpdate: useCallback(() => requestUpdate('News'), [requestUpdate]),
  };
};
