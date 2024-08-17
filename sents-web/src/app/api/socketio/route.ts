// app/api/socketio/route.ts

import { Server as HTTPServer } from 'http';
import { Socket as NetSocket } from 'net';

import { NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { Server as SocketIOServer } from 'socket.io';

import { initSocketServer } from '../../../server/socketServer';

interface SocketServer extends HTTPServer {
  io?: SocketIOServer;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

const SocketHandler = (req: NextRequest, res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    console.log('Socket is initializing');
    const io = initSocketServer(res.socket.server);
    res.socket.server.io = io;
  }

  return NextResponse.json({ message: 'Socket.IO server running' });
};

export const GET = SocketHandler;
export const POST = SocketHandler;
