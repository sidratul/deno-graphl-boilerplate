import { AuthService } from "./auth.service.ts";
import { registerInput, loginInput } from "./auth.validation.ts";

const authService = new AuthService();

export const resolvers = {
  Mutation: {
    register: (_: unknown, { input }: { input: typeof registerInput._type }) => {
      registerInput.parse(input);
      return authService.register(input);
    },
    login: (_: unknown, { input }: { input: typeof loginInput._type }) => {
      loginInput.parse(input);
      return authService.login(input);
    },
  },
};