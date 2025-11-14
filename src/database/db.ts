import { init } from "@instantdb/react"
import schema from "../instant.schema"

export const db = init({
  schema,
  appId: import.meta.env.VITE_INSTANT_APP_ID as string,
  useDateObjects: true,
  devtool: {
    position: "bottom-left"
  }
})
