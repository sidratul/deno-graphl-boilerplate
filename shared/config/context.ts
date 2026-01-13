// In a real app, you would import the User type
// import { User } from "@/user/user.d.ts";

/**
 * The context that will be available in all resolvers.
 * It can be extended to include more properties.
 * In a real app, you would typically populate the user property
 * in the context creation logic based on a JWT or session.
 */
export interface AppContext {
  // user?: User;
}
