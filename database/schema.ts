import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const categoryTable = sqliteTable("category", {
  id: int("id").primaryKey(),
  title: text().notNull(),
  description: text("description").notNull(),
});
