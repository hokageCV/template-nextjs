import config from '@/config/config'
import { Account, Client } from 'appwrite'

const appwriteClient = new Client()

appwriteClient.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId)

export const account = new Account(appwriteClient)

