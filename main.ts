import "#shared/config/env.ts"; // Validate environment variables on startup
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as healthResolvers } from "@/health/health.resolver.ts";
import { typeDefs as healthTypeDefs } from "@/health/health.typedef.ts";
import { ObjectIdScalar } from "#shared/scalar/objectid.scalar.ts";
import { DateScalar } from "#shared/scalar/date.scalar.ts";
import { paginationTypeDef } from "#shared/types/pagination.type.ts";
import { sortTypeDef } from "#shared/types/sort.type.ts";
import { connectToDatabase } from "#shared/database/mongo.ts";

// Connect to the database
await connectToDatabase();

const baseTypeDefs = `
  scalar ObjectId
  scalar Date

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }

  type ActionResponse {
    id: ObjectId
    message: String
  }
`;

const schema = makeExecutableSchema({
  resolvers: [
    {
      ObjectId: ObjectIdScalar,
      Date: DateScalar,
    },
    healthResolvers,
  ],
  typeDefs: [
    baseTypeDefs,
    paginationTypeDef,
    sortTypeDef,
    healthTypeDefs,
  ],
});

const yoga = createYoga({
  schema,
});

const port = Number(Deno.env.get("PORT") ?? 8000);

Deno.serve({
  handler: yoga,
  port,
  onListen({ hostname, port }) {
    console.log(`Listening on http://${hostname}:${port}${yoga.graphqlEndpoint}`);
  },
});
