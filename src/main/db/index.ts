import { app } from 'electron'
import Database, { RunResult } from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'
import path from 'path'
import { AppState } from '@shared/app-state'
import { eq } from 'drizzle-orm'

const sqlite = new Database(path.join(app.getPath('userData'), 'app.db'))

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS app (
    id INTEGER PRIMARY KEY DEFAULT 0,
    userName TEXT NOT NULL DEFAULT '',
    createDate TEXT NOT NULL DEFAULT '',
    protectedData TEXT NOT NULL DEFAULT ''
  );
`)

const db = drizzle(sqlite, { schema })

/**
 * Init database
 */
export const initDatabase = async (): Promise<RunResult> => {
  return db
    .insert(schema.app)
    .values({
      id: 0,
      userName: '',
      createDate: new Date().toISOString(),
      protectedData: ''
    })
    .onConflictDoNothing({ target: schema.app.id })
}

/**
 * Get app state
 */
export const getAppState = async (): Promise<AppState> => {
  const appData = await db.query.app.findFirst({
    where: (fields, { eq }) => eq(fields.id, 0)
  })

  if (!appData) {
    throw new Error('App state not found')
  }

  return {
    isInitialized: appData.userName.length > 0,
    userName: appData.userName,
    createDate: appData.createDate
  }
}

/**
 * Save user data
 * @param userName
 * @param createDate
 * @param protectedData
 */
export const saveUserData = async (
  userName: string,
  createDate: string,
  protectedData: string
): Promise<void> => {
  await db
    .update(schema.app)
    .set({ userName, createDate, protectedData })
    .where(eq(schema.app.id, 0))
}

/**
 * Clear all user data (recovery to init app)
 */
export const clearAppData = async (): Promise<RunResult> => {
  return db
    .update(schema.app)
    .set({ userName: '', createDate: new Date().toISOString(), protectedData: '' })
    .where(eq(schema.app.id, 0))
}

/**
 * Get encrypt string from db
 */
export const getProtectedStr = async (): Promise<string> => {
  const appState = await db.query.app.findFirst({
    where: (fields, { eq }) => eq(fields.id, 0)
  })

  if (!appState) {
    throw new Error('App state not found')
  }

  return appState.protectedData
}

/**
 * Save encrypt string to db
 */
export const saveProtectedStr = async (protectedData: string): Promise<RunResult> => {
  return db.update(schema.app).set({ protectedData }).where(eq(schema.app.id, 0))
}
