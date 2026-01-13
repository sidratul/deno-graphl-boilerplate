import { z } from "zod";

export const registerInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const loginInput = z.object({
  email: z.string().email(),
  password: z.string(),
});