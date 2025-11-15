import type { AuthHooks } from "@daveyplate/better-auth-ui"
import { useInstantSession } from "better-auth-instantdb/react"
import { db } from "@/database/db"
import { authClient } from "@/lib/auth-client"

export const authHooks = {
  useSession: () => useInstantSession({ db, authClient, persistent: true })
} satisfies Partial<AuthHooks>
