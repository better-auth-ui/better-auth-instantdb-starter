import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { Link, useRouter } from "@tanstack/react-router"
import { InstantAuth } from "better-auth-instantdb/react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "sonner"

import { db } from "@/database/db"
import { authHooks } from "@/hooks/auth-hooks"
import { authClient } from "@/lib/auth-client"

export function Providers({ children }: { children: React.ReactNode }) {
  const { navigate } = useRouter()

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AuthUIProvider
        authClient={authClient}
        hooks={authHooks}
        navigate={(href) => navigate({ href })}
        replace={(href) => navigate({ href, replace: true })}
        Link={({ href, ...props }) => <Link to={href} {...props} />}
        multiSession
      >
        <InstantAuth db={db} authClient={authClient} persistent />

        {children}

        <Toaster />
      </AuthUIProvider>
    </ThemeProvider>
  )
}
