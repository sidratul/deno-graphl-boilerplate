import { AuthDoc } from "@/auth/auth.d.ts";
import { verifyToken } from "#shared/utils/jwt.ts";
import { YogaInitialContext } from "graphql-yoga";
import { User } from "@/auth/auth.schema.ts";

/**
 * Creates the application context for each GraphQL request with authentication.
 * This function handles JWT verification and user retrieval.
 */
export async function createAuthContext({ request }: YogaInitialContext) {
  const token = request.headers.get("authorization")?.replace("Bearer ", "");
  let user;
  
  if (token) {
    try {
      const payload = verifyToken(token) as { id: string };
      user = await User.findById(payload.id);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("JWT verification failed:", error.message);
      } else {
        console.error("JWT verification failed:", error);
      }
    }
  }
  
  return { user };
}