import jwt from "jsonwebtoken";
import { Buffer } from "node:buffer";

const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

export function createToken(payload: string | object | Buffer): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
}

export function verifyToken(token: string): string | jwt.JwtPayload {
  return jwt.verify(token, JWT_SECRET);
}
