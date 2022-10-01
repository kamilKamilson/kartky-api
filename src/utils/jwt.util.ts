import jwt, { JwtPayload } from "jsonwebtoken";
import envResolver from "./envResolver.util";

envResolver();

export const generateAccessToken = (payload: JwtPayload) => jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: process.env.JWT_EXPIRES_IN });
