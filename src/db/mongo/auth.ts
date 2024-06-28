import type { logInType, signUpType } from '@/types'
import { User } from './schema'

export class MongoAuthService {
  async signUp({ name, email, password }: signUpType) {
    try {
      const data = await User.create({ name, email, password })

      return { data, message: 'user created', status: 200 }
    } catch (error: any) {
      return { error: error.message, status: 500 }
    }
  }

  async logIn({ email, password }: logInType) { }

  async isLoggedIn() { }
  async getCurrentUser() { }
}

const mongoAuthService = new MongoAuthService()
export default mongoAuthService
