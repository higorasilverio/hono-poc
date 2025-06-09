import type { Config } from "drizzle-kit";

const host = process.env.DB_HOST ?? "";
const port = Number(process.env.DB_PORT) ?? 3306;
const user = process.env.DB_USER ?? "";
const password = process.env.DB_PASSWORD ?? "";
const database = process.env.DB_NAME ?? "";

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dialect: "mysql",
  dbCredentials: {
    host,
    port,
    user,
    password,
    database,
  },
} satisfies Config;
