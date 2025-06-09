import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const items = mysqlTable('items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
})
