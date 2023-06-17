import { pgTable, serial, text } from "drizzle-orm/pg-core";
 
export const users = pgTable('messages', {
  id: serial('id').primaryKey(),
  name: text('full_name'),
  email: text('email'),
  content: text('message'),
});
