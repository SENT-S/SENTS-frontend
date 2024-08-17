// hooks/useSocket.ts

import { useSession } from 'next-auth/react';
import { useEffect, useState, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

import { CustomSession } from '@/utils/types';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: session } = useSession() as { data: CustomSession };

  useEffect(() => {
    if (!session?.token) return;

    const socketIo = io(process.env.NEXT_PUBLIC_URL || '', {
      path: '/api/socketio',
      auth: { token: session.token },
    });

    const handleConnect = () => {
      console.log('Connected to socket server');
      socketIo.emit('subscribeCompanies');
      socketIo.emit('subscribeCompanyNews');
    };

    const handleDisconnect = () => {
      console.log('Disconnected from socket server');
    };

    socketIo.on('connect', handleConnect);
    socketIo.on('disconnect', handleDisconnect);

    setSocket(socketIo);

    return () => {
      socketIo.off('connect', handleConnect);
      socketIo.off('disconnect', handleDisconnect);
      socketIo.disconnect();
    };
  }, [session?.token]);

  const refreshData = useCallback(
    (dataType: any) => {
      socket?.emit(dataType);
    },
    [socket],
  );

  const refreshCompanies = useCallback(() => refreshData('subscribeCompanies'), [refreshData]);
  const refreshNews = useCallback(() => refreshData('subscribeCompanyNews'), [refreshData]);

  return { socket, refreshCompanies, refreshNews };
};
