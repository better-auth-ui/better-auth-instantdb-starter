import type { AuthHooks } from "@daveyplate/better-auth-ui"
import type { User } from "better-auth"
import type { BetterFetchError } from "better-auth/react"
import { db } from "@/database/db"
import { authClient } from "@/lib/auth-client"

export const authHooks = {
  useSession: () => {
    const { data: sessionData, ...rest } = authClient.useSession()
    const { user, error } = db.useAuth()

    const { data } = db.useQuery(
      user && user.id === sessionData?.user?.id
        ? {
            $users: { $: { where: { id: user.id } } }
          }
        : null
    )

    if (sessionData && data?.$users?.length) {
      sessionData.user = data.$users[0] as User
    }

    if (sessionData && sessionData.user?.id !== user?.id) {
      return {
        ...rest,
        data: null,
        isPending: !error,
        isRefetching: !error,
        error: (error as BetterFetchError) || null
      }
    }

    return {
      data: sessionData,
      ...rest
    }
  }
} satisfies Partial<AuthHooks>
