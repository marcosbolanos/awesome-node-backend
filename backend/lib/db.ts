import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as userSchema from '../src/db/schema/user';
import * as authSchema from '../src/db/schema/auth-schema';

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema: { ...userSchema, ...authSchema }
})
