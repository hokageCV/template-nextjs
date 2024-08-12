import type { LoginType, SignUpType } from '@/types'
import { v4 as uuidv4 } from 'uuid';
import { account } from './config'

export class AppwriteAuthService {
  async createUserAccount({ email, password, name }: SignUpType) {
    try {
      const userId = uuidv4()
      console.log('💧🔥 DBG:',{userId, email, password, name});
      const userAccount = await account.create(userId, email, password, name)

      if (userAccount) {
        return this.login({ email, password })
      } else {
        userAccount
      }
      console.log('🔥 DBG: 1',userAccount);
    } catch (error) {
      console.log('🔥 DBG: 2',error);
      throw error
    }
  }

  async login({ email, password }: LoginType) {
    try {
      return await account.createSession(email, password)
    } catch (error) {
      throw error
    }
  }

  async isLoggedIn(): Promise<boolean> {
    try {
      const data = await this.getCurrentUser()
      return Boolean(data)
    } catch (error) { }

    return false
  }

  async getCurrentUser() {
    try {
      return account.get()
    } catch (error) {
      console.log('getcurrentUser error: ' + error)
    }

    return null
  }

  async logout() {
    try {
      return await account.deleteSession('current')
    } catch (error) {
      console.log('logout error: ' + error)
    }
  }
}

const appwriteAuthService = new AppwriteAuthService()
export default appwriteAuthService
