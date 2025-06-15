import { app } from 'electron'
import Database, { RunResult } from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import path from 'path'
import { AppState } from '@shared/app-state'

const sqlite = new Database(path.join(app.getPath('userData'), 'app.db'))

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS app (
    id INTEGER PRIMARY KEY DEFAULT 0,
    userName TEXT NOT NULL DEFAULT '',
    password TEXT NOT NULL DEFAULT '',
    createDate TEXT NOT NULL DEFAULT '',
    protectedData TEXT NOT NULL DEFAULT ''
  );
`)

const db = drizzle(sqlite, { schema })

export const initDatabase = async (): Promise<RunResult> => {
  return db
    .insert(schema.app)
    .values({
      id: 0,
      userName: '',
      createDate: new Date().toISOString(),
      password: '',
      protectedData: '{}'
    })
    .onConflictDoNothing({ target: schema.app.id })
}

export const getAppState = async (): Promise<AppState> => {
  const appData = await db.query.app.findFirst({
    where: (fields, { eq }) => eq(fields.id, 0)
  })

  if (!appData) {
    await initDatabase()

    return { isInitialized: false, createDate: '', userName: '' }
  }

  return {
    isInitialized: appData.userName.length > 0,
    userName: appData.userName,
    createDate: appData.createDate
  }
}
