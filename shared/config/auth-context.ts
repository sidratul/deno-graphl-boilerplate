import { verifyToken } from "#shared/utils/jwt.ts";
import { YogaInitialContext } from "graphql-yoga";
import AuthModel from "@/auth/auth.schema.ts";
import { AuthDoc } from "@/auth/auth.d.ts";

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
      const userOrNull = await AuthModel.findById(payload.id);
      // Hanya gunakan user jika ditemukan
      user = userOrNull || undefined;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("JWT verification failed:", error.message);
      } else {
        console.error("JWT verification failed:", error);
      }
    }
  }

  // Kembalikan user dengan tipe yang sesuai
  return { user: user as AuthDoc | undefined };
}