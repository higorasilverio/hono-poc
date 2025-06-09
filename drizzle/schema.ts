import { mysqlTable, serial, varchar, text, int, decimal } from 'drizzle-orm/mysql-core'

export const items = mysqlTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  value: decimal('value', { precision: 10, scale: 2 }).notNull(),
  description: text('description').default('No description'),
  quantity: int('quantity').default(0),
})
