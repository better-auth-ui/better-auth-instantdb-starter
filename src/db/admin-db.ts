import { init } from "@instantdb/admin"

export const adminDb = init({
  appId: process.env.VITE_INSTANT_APP_ID as string,
  adminToken: process.env.INSTANT_ADMIN_TOKEN
})
