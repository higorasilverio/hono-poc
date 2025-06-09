import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager'

let dbInstance: ReturnType<typeof drizzle> | null = null

export const getDb = async () => {
  if (dbInstance) return dbInstance

  const client = new SecretsManagerClient({})
  const command = new GetSecretValueCommand({ SecretId: process.env.DB_SECRET_NAME! })
  const response = await client.send(command)

  if (!response.SecretString) {
    throw new Error('Missing SecretString in SecretsManager response.')
  }

  const secret = JSON.parse(response.SecretString)

  const pool = mysql.createPool({
    host: secret.host,
    user: secret.username,
    password: secret.password,
    database: process.env.DB_NAME!,
    waitForConnections: true,
    connectionLimit: 5,
  })

  dbInstance = drizzle(pool)
  return dbInstance
}
