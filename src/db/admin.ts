import { init } from "@instantdb/admin"
import schema from "@/instant.schema"

export const adminDb = init({
  schema,
  appId: process.env.VITE_INSTANT_APP_ID as string,
  adminToken: process.env.INSTANT_ADMIN_TOKEN,
  useDateObjects: true
})
