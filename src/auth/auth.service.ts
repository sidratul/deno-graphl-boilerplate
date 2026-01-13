import { User } from "./auth.schema.ts";
import { registerInput, loginInput } from "./auth.validation.ts";
import { GraphQLError } from "graphql";
import bcrypt from "bcrypt";
import { createToken } from "#shared/utils/jwt.ts";

export class AuthService {
  async register(input: typeof registerInput._type) {
    const existingUser = await User.findOne({ email: input.email });
    if (existingUser) {
      throw new GraphQLError("User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10); // 10 is the salt rounds
    const user = new User({
      ...input,
      password: hashedPassword,
    });
    await user.save();

    return {
      id: user.id,
      message: "User created successfully",
    };
  }

  async login(input: typeof loginInput._type) {
    const user = await User.findOne({ email: input.email });
    if (!user) {
      throw new GraphQLError("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);
    if (!isPasswordValid) {
      throw new GraphQLError("Invalid credentials");
    }

    const token = createToken({ id: user.id });

    return {
      token: token,
    };
  }
}
