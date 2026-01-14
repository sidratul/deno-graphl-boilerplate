import AuthModel from "./auth.schema.ts";
import { registerInput, loginInput } from "./auth.validation.ts";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { createToken } from "#shared/utils/jwt.ts";
import { AppContext } from "#shared/config/context.ts";
import { isAuthenticated } from "#shared/guards/authorization.guard.ts";
import { UserRole } from "#shared/enums/enum.ts";
import { MESSAGES } from "#shared/enums/constant.ts";

export class AuthService {
  async register(input: typeof registerInput._type) {
    const existingUserOrNull = await AuthModel.findOne({ email: input.email }).exec();
    if (existingUserOrNull) {
      throw new GraphQLError(MESSAGES.AUTH.EMAIL_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(input.password, 10); // 10 is the salt rounds
    const user = new AuthModel({
      ...input,
      password: hashedPassword,
      role: UserRole.USER, // Default role is USER
    });
    await user.save();

    return {
      id: user.id,
      message: MESSAGES.AUTH.REGISTER_SUCCESS,
    };
  }

  async login(input: typeof loginInput._type) {
    const userOrNull = await AuthModel.findOne({ email: input.email }).exec();
    if (!userOrNull) {
      throw new GraphQLError(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(input.password, userOrNull.password);
    if (!isPasswordValid) {
      throw new GraphQLError(MESSAGES.AUTH.INVALID_CREDENTIALS);
    }

    const token = createToken({ id: userOrNull.id });

    return {
      token: token,
    };
  }

  async getProfile(context: AppContext) {
    isAuthenticated(context);
    if (!context.user) {
      throw new GraphQLError(MESSAGES.GENERAL.NOT_FOUND);
    }

    // Return user profile without sensitive information
    const userObject = context.user.toObject();
    const { password, ...profile } = userObject;
    return profile;
  }
}
