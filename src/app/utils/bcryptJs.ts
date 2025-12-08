import bcrypt from "bcryptjs"
import { envVariables } from "../constants/env"
export const hashPassword = async(payload:string) => {
    const password = await bcrypt.hash(payload, +envVariables.BCRYPT_SALT_ROUND)
    return password
}