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
const EXPRESS_SESSION_SECRET = getEnv("EXPRESS_SESSION_SECRET")
const GOOGLE_CALLBACK_URL = getEnv(`GOOGLE_CALLBACK_URL`)
const GOOGLE_CLIENT_ID = getEnv(`GOOGLE_CLIENT_ID`)
const GOOGLE_CLIENT_SECRET = getEnv(`GOOGLE_CLIENT_SECRET`)
const FRONTEND_PORT = getEnv(`FRONTEND_PORT`)


export const envVariables = { MONGO_URL, PORT, NODE_ENV, JWT_SECRET_TOKEN, JWT_SECRET_EXPIRE, BCRYPT_SALT_ROUND, JWT_REFRESH_EXPIRE, JWT_REFRESH_TOKEN, EXPRESS_SESSION_SECRET, GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,FRONTEND_PORT }