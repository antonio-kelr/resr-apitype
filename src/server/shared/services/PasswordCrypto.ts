import { compare, genSalt, hash } from "bcrypt"

const SATL_PASSOWRD  = 8;

const hasPassword = async (password: string) => {
  const satlGenerated = await genSalt(SATL_PASSOWRD)

  return await hash(password, satlGenerated)
}
const verifyPassword = async (password: string, hashedPassword: string) =>  {
    return await compare(password, hashedPassword)
}

export const PasswordCrypot = {
    hasPassword,
    verifyPassword

}