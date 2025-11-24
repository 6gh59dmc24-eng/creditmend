import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: string
      clientProfile?: any
      staffProfile?: any
    } & DefaultSession["user"]
  }

  interface User {
    role: string
    clientProfile?: any
    staffProfile?: any
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string
    clientProfile?: any
    staffProfile?: any
  }
}