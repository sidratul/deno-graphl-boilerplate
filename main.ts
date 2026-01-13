import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers as healthResolvers } from "@/health/health.resolver.ts";
import { typeDefs as healthTypeDefs } from "@/health/health.typedef.ts";
import { resolvers as AuthResolvers } from "@/auth/auth.resolver.ts";
import { typeDefs as AuthTypeDefs } from "@/auth/auth.typedef.ts";
// SCAFFOLD_IMPORT
import { scalarResolvers } from "#shared/scalar/scalar.resolver.ts";
import { sharedTypeDefs, baseTypeDefs } from "#shared/types/shared.type.ts";
import { connectToDatabase } from "#shared/database/mongo.ts";
import { createAuthContext } from "#shared/config/auth-context.ts";
import { AppContext } from "#shared/config/context.ts";

// Connect to the database
await connectToDatabase();

const schema = makeExecutableSchema({
  resolvers: [
    scalarResolvers,
    healthResolvers,
    AuthResolvers,
    // SCAFFOLD_RESOLVER
  ],
  typeDefs: [
    ...sharedTypeDefs,
    baseTypeDefs,
    healthTypeDefs,
    AuthTypeDefs,
    // SCAFFOLD_TYPEDEF
  ],
});

const yoga = createYoga({
  schema,
  context: async (ctx) => {
    const { user } = await createAuthContext(ctx);
    return new AppContext(user);
  },
});

const port = Number(Deno.env.get("PORT") ?? 8000);

Deno.serve({
  handler: yoga,
  port,
  onListen({ hostname, port }) {
    console.log(`Listening on http://${hostname}:${port}${yoga.graphqlEndpoint}`);
  },
});

