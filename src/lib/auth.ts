import { betterAuth } from "better-auth"
import { instantAdapter } from "better-auth-instantdb"
import { adminDb } from "@/db/admin-db"

export const auth = betterAuth({
  database: instantAdapter({
    db: adminDb,
    usePlural: true
  }),
  emailAndPassword: {
    enabled: true
  }
})
