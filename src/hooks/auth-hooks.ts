import type { AuthHooks } from "@daveyplate/better-auth-ui"
import type { User } from "better-auth"
import type { BetterFetchError } from "better-auth/react"
import { db } from "@/database/db"
import { authClient } from "@/lib/auth-client"

export const authHooks = {
  useSession: () => {
    const {
      data: sessionData,
      isPending,
      error,
      isRefetching,
      ...rest
    } = authClient.useSession()

    const { user: authUser, error: authError, isLoading } = db.useAuth()

    const { data } = db.useQuery(
      authUser
        ? {
            $users: { $: { where: { id: authUser.id } } }
          }
        : null
    )

    if (data?.$users?.length) {
      const user = data.$users[0] as User

      if (sessionData?.user?.id === user.id) {
        sessionData.user = user
      }
    }

    return {
      data: !authError ? sessionData : null,
      isPending: isLoading || isPending,
      isRefetching: isLoading || isRefetching,
      error: ((authError || error) as BetterFetchError) || null,
      ...rest
    }
  }
} satisfies Partial<AuthHooks>
