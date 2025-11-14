import { init } from "@instantdb/react"
import schema from "../instant.schema"

export const db = init({
  appId: import.meta.env.VITE_INSTANT_APP_ID as string,
  schema,
  devtool: {
    position: "bottom-left"
  }
})
