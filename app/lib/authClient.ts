import { createAuthClient } from 'better-auth/client';
import dotenv from 'dotenv';
dotenv.config();
export const authClient = createAuthClient({});
