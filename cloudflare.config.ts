import { defineConfig } from "cf/config"
export default defineConfig({
  worker: {
    name: "better-auth-instant",
    compatibilityDate: "2025-09-02",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint: "@tanstack/react-start/server-entry",
    observability: {
      enabled: true
    }
  }
})
