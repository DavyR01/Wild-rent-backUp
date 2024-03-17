import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dataSource from "./config/datasource";
import { CategoryResolver, ProductResolver } from "./resolvers";

const start = async () => {

  await dataSource.initialize();
  
  const schema = await buildSchema({
    resolvers: [ProductResolver, CategoryResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

start();
