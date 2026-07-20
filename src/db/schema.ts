import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const enquiries = pgTable('enquiries', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  company: text('company'),
  message: text('message').notNull(),
  workspaceNeeds: text('workspace_needs'), // Comma separated selected tools or description of needs
  createdAt: timestamp('created_at').defaultNow(),
});
