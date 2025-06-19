import { AppState } from '@shared/app-state'
import { getAppState, saveUserData, getProtectedStr, saveProtectedStr, clearAppData } from '../db'
import { encrypt, decrypt } from './encrypt'

class AppStore {
  private appState: AppState | null
  private key: string | null

  constructor() {
    this.appState = null
    this.key = null
  }

  /**
   * Get app state
   */
  public async getAppState(): Promise<AppState> {
    this.appState = await getAppState()

    return this.appState
  }

  /**
   * Sign up
   * @param userName
   * @param password
   */
  public async signUp(userName: string, password: string): Promise<AppState> {
    const protectedData = encrypt(password, '{}')

    const date = new Date().toISOString()

    await saveUserData(userName, date, protectedData)

    if (this.appState) {
      this.appState.createDate = date
      this.appState.userName = userName
      this.appState.isInitialized = true
    }

    this.key = password

    return this.appState!
  }

  /**
   * Sign in
   * @param password
   */
  public async signIn(password: string): Promise<AppState> {
    if (!this.appState || !this.appState.isInitialized) {
      throw new Error('App is not initialized')
    }

    const protectedStr = await getProtectedStr()

    try {
      decrypt(password, protectedStr)
      this.key = password

      return this.appState
    } catch {
      throw new Error('Check your credentials')
    }
  }

  /**
   * Sign out
   */
  public signOut(): void {
    this.key = null
  }

  /**
   * Get protected data
   */
  public async getProtectedData(): Promise<{ data: unknown }> {
    if (!this.key) {
      throw new Error('User is not authenticated')
    }

    try {
      const protectedStr = await getProtectedStr()

      const dataStr = decrypt(this.key, protectedStr)

      return { data: JSON.parse(dataStr) }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  /**
   * Get protected data
   */
  public async saveProtectedData(data: unknown): Promise<{ status: string }> {
    if (!this.key) {
      throw new Error('User is not authenticated')
    }

    try {
      await saveProtectedStr(encrypt(this.key, JSON.stringify(data)))

      return { status: 'success' }
    } catch (error) {
      throw new Error((error as Error).message)
    }
  }

  /**
   * Clear app data
   */
  public async clearAppData(): Promise<{ status: string }> {
    await clearAppData()

    return { status: 'success' }
  }
}

export const appStore = new AppStore()
