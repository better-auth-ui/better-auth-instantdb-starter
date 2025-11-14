import { betterAuth } from "better-auth"
import { instantAdapter } from "better-auth-instantdb"
import { v7 } from "uuid"
import { adminDb } from "@/database/admin-db"

export const auth = betterAuth({
  database: instantAdapter({ db: adminDb }),
  emailAndPassword: {
    enabled: true
  },
  advanced: {
    database: {
      generateId: () => v7()
    }
  }
})
