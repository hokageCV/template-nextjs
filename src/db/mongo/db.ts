import { User } from './schema'

export class MongoDbService {
  async isUserExists(email: string) {
    try {
      const existingUser = await User.findOne({ email })
      return !!existingUser
    } catch (error: any) {
      return { error: error.message, status: 500 }
    }
  }
}

const mongoDbService = new MongoDbService()
export default mongoDbService
