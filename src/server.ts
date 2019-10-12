import * as createServer from 'fastify';
import * as swagger from 'fastify-swagger';
import * as  sensible from 'fastify-sensible';
import * as cors from 'fastify-cors';
import * as  formbody from 'fastify-formbody';
import * as websocket from 'fastify-websocket';
import * as  multipart from 'fastify-multipart';
import * as staticFiles from 'fastify-static';

import corsConfig from "./config/cors";
import multipartConfig from "./config/multipart";
import staticConfig from './config/static';
import serverConfig from './config/server';

import { routes } from './routes';
import { checkSignature, createErrorObject, handleError, saveData } from './utils';
import { Sentry } from './lib/sentry';

export function createHTTPServer() {
  const fastify = createServer(serverConfig);
  fastify.register(cors, corsConfig);
  fastify.register(formbody);
  fastify.register(staticFiles, staticConfig);
  fastify.register(websocket);
  fastify.register(multipart, { ...multipartConfig, onFile: saveData });
  fastify.register(routes, { prefix: '/v1' });
  fastify.register(sensible);

  fastify.addHook('onError', (req, reply, error, next) => {
    console.log(error);
    next();
  });

  fastify.setErrorHandler((error: any, request, reply) => {
    if (error.validation) return handleError(error, request, reply);
    error.errorCode ? reply.status(400).send(error) : reply.status(505).send(error);
  });

  fastify.addHook('onRequest', (req, reply, next) => {
    // @ts-ignore
    req.startTime = new Date().getTime();
    next();
  });

  fastify.addHook('preHandler', (req, reply, done) => {
    if (!('x-signature' in req.headers)) {
      reply.status(200).send(createErrorObject('none'));
      return;
    }

    const signature = req.headers['x-signature'];
    const input = JSON.stringify(req.body);
    const valid = checkSignature(input, signature);
    if (!valid) {
      reply.status(200).send(createErrorObject('none'));
      return;
    }

    done();
  });

  fastify.addHook('onResponse', (req, reply, next) => {
    // @ts-ignore
    const time = new Date().getTime() - req.startTime;
    console.log(`[${req.raw.method}<${req.ip}>] ${req.raw.url} - ${time}ms - ${JSON.stringify(req.body)} - ${reply.res.statusCode}|${reply.res.statusMessage}`);
    next()
  });

  return fastify;
}

export async function startServer() {
  const port = parseInt(process.env.PORT) || 8080;
  const environment = process.env.ENVIRONMENT || 'dev';
  console.log(`Server started :${port} in mode: ${environment}`);
  const fastify = createHTTPServer();
  await fastify.listen(port, '0.0.0.0');
}

process.on('uncaughtException', err => {
  console.error(err);
});
