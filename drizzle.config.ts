import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schema",
  out: "./database/out",
  dialect: "sqlite",
  driver: "expo",
  // Important: Don't include tablesFilter for initial setup
  verbose: true,
  strict: true,
});