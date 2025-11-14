import type { User } from "better-auth"
import { db } from "@/db/instant"
import { authClient } from "@/lib/auth-client"

export const authHooks = {
  useSession: () => {
    const { data: sessionData, ...rest } = authClient.useSession()

    const { data } = db.useQuery({
      $users: { $: { where: { id: sessionData?.user?.id } } }
    })

    if (sessionData && data?.$users?.length) {
      sessionData.user = data.$users[0] as User
    }

    return {
      data: sessionData,
      ...rest
    }
  }
}
