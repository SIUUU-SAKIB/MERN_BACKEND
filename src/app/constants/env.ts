import dotenv from "dotenv"
dotenv.config()
const getEnv = (key: string, defaultValue?: string): string => {
    const value = process.env[key] || defaultValue
    if (value === undefined) {
        throw new Error(`Missing enviroment variable ${key}`)
    }
    return value
}
const MONGO_URL = getEnv("MONGO_URL")
const NODE_ENV = getEnv("NODE_ENV")
const PORT = getEnv("PORT", '4000')
const JWT_SECRET_TOKEN = getEnv("JWT_SECRET_TOKEN")
const JWT_SECRET_EXPIRE = getEnv("JWT_SECRET_EXPIRE")
const BCRYPT_SALT_ROUND = getEnv("BCRYPT_SALT_ROUND")
const JWT_REFRESH_TOKEN = getEnv("JWT_REFRESH_TOKEN")
const JWT_REFRESH_EXPIRE = getEnv("JWT_REFRESH_EXPIRE")


export const envVariables = { MONGO_URL, PORT, NODE_ENV, JWT_SECRET_TOKEN, JWT_SECRET_EXPIRE, BCRYPT_SALT_ROUND, JWT_REFRESH_EXPIRE, JWT_REFRESH_TOKEN }