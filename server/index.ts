// server/index.ts
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import next from 'next';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from '../graphql/typeDefs';
import { resolvers } from '../graphql/resolver';

import startGrpcServer from '../grpc/server';

// Роуты
import teacherRoutes from './routes/teacher';
import studentRoutes from './routes/student';
import courseRoutes from './routes/courses';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src' }); 
// ВАЖНО: "dir: './src'", если папка с App Router'ом внутри src/app.

const handle = app.getRequestHandler();

async function main() {
  await app.prepare();

  const expressApp = express();
  const httpServer = createServer(expressApp);

  // Чтобы читать JSON body в Express
  expressApp.use(express.json());

  // Подключаем REST-роуты на /api/...
  expressApp.use('/api/teachers', teacherRoutes);
  expressApp.use('/api/students', studentRoutes);
  expressApp.use('/api/courses', courseRoutes);

  // Apollo (GraphQL) на /api/graphql
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({
    app: expressApp,
    path: '/api/graphql',
  });

  // Socket.IO
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected via Socket.IO');

    socket.on('teacher:announcement', (msg) => {
      // Рассылаем всем
      io.emit('announcement', msg);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // gRPC-сервер (запустится параллельно)
  startGrpcServer();

  // Все остальные запросы -> Next.js (рендер страниц из src/app)
  expressApp.all('*', (req, res) => handle(req, res));

  // Запуск
  const port = process.env.PORT || 3000;
  httpServer.listen(port, () => {
    console.log(`> Custom server is running on http://localhost:${port}`);
    console.log(`> GraphQL: http://localhost:${port}/api/graphql`);
  });
}

main().catch((err) => console.error(err));
