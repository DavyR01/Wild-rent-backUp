import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import http from 'http';
import * as jwt from "jsonwebtoken";
import { AddressInfo } from "net";
import { createClient } from "redis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import dataSource from "./config/datasource";
import {
   CategoryResolver,
   CheckoutResolver,
   ProductResolver,
   UserResolver,
} from "./resolvers";

// import { fillDatabaseIfEmpty } from "./fillDatabaseIfEmpty";

require("dotenv").config();

export const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const redisClient = createClient({
   url: "redis://redis",
});

redisClient.on("error", (err: Error) => {
   console.log("Redis CLient Error", err);
});

redisClient.on("connect", () => {
   console.log("Redis connected");
});

const start = async () => {
   await redisClient.connect();
   await dataSource.initialize();

   //   await fillDatabaseIfEmpty();

   const schema = await buildSchema({
      resolvers: [
         ProductResolver,
         CategoryResolver,
         UserResolver,
         CheckoutResolver,
      ],
      //  validate:true,
      // authChecker est appelée par TypeGraphQL chaque fois qu'une requête est effectuée sur un champ protégé par un décorateur @Authorized.
      authChecker: ({ context }, roles) => {
         if (roles.length > 0 && context.email) {
            if (roles.includes(context.role)) {
               return true;
            } else return false;
         }
         if (roles.length === 0 && context.email) {
            return true;
         } else return false
      },
   });

   const server = new ApolloServer({ schema });

   await server.start();

   const app = express();
   app.use(
      cors({
         origin: ['https://www.yourfrontend.com', 'http://localhost:3000'],
         credentials: true,
      }),
      express.json(),
      expressMiddleware(server, {
         context: async ({ req }) => {
            const token = req.headers.authorization?.split("Bearer ")[1];
            console.log("TOKEN : ", token);

            if (token) {
               try {
                  const payload = jwt.verify(token, "mysupersecretkey");
                  console.log("PAYLOAD :", payload);
                  return payload;
               } catch {
                  console.log("invalid secret key");
               }
            }
            return {};
         },
      })
   );

   const httpServer = http.createServer(app);

   await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));

   const addressInfo = httpServer.address() as AddressInfo;
   const url = `http://localhost:${addressInfo.port}`;

   console.log(`🚀  Server ready at: ${url}`);

   return { url };
};



start().then(({ url }) => {
   console.log(`Server started at ${url}`);
}).catch(error => {
   console.error('Failed to start the server:', error);
});