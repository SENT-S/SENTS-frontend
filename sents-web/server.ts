// server.ts

import http from 'http';
import path from 'path';
import { parse } from 'url';

import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import next from 'next';

import { initSocketServer } from './src/server/socketServer';

config({ path: path.resolve(process.cwd(), '.env.local') });

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = http.createServer(expressApp);

  expressApp.use(cors());

  expressApp.all('*', (req: any, res: any) => {
    const parsedUrl = parse(req.url!, true);
    return handle(req, res, parsedUrl);
  });

  initSocketServer(server);

  const port = process.env.NEXT_PUBLIC_PORT || 3000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
