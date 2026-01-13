import { AppContext } from "@/shared/config/context.ts";

// This is a placeholder for the real User type
interface UserContext {
  role: string;
}

/**
 * A sample guard function to check for an authenticated user.
 * In a real application, this would involve token verification.
 * @param context The GraphQL context, which should include the user.
 */
export const AuthGuard = (context: AppContext & { user?: UserContext }) => {
  if (!context.user) {
    throw new Error("Authentication required. You must be logged in.");
  }
};

/**
 * A sample guard function to check if the user is an admin.
 * @param context The GraphQL context.
 */
export const AdminGuard = (context: AppContext & { user?: UserContext }) => {
  AuthGuard(context); // First, ensure the user is authenticated.
  if (context.user?.role !== "ADMIN") {
    throw new Error("Authorization failed. Admin role required.");
  }
};
