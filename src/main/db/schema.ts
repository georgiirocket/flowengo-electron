import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const app = sqliteTable('app', {
  id: int('id').primaryKey().default(0),
  userName: text('userName').notNull().default(''),
  password: text('password').notNull().default(''),
  createDate: text('createDate').notNull().default(''),
  protectedData: text('protectedData').notNull().default('')
})
