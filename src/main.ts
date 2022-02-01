import "reflect-metadata";

import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import hbs from "hbs";
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';

import { ErrorHandlerMiddleware } from "./middlewares";

import './controllers';
import { bindings } from "./ioc";

dotenv.config();

// Enviroment variables
const PORT = parseInt(process.env?.PORT || "8000");

(async () => {
  const container = new Container();

  await container.loadAsync(bindings);

  const server = new InversifyExpressServer(container);

  server.setConfig((app: Application) => {
    app.use(express.json());
    app.use(express.urlencoded({
      extended: true
    }));

    app.set('view engine', 'html');
    app.engine('html', hbs.__express);

    app.use('/public', express.static('public'))

  })

  server.setErrorConfig((app) => app.use(ErrorHandlerMiddleware));

  const serverInstance = server.build();

  serverInstance.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT} :)`));
})()
