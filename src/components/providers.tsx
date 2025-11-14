import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { Link, useRouter } from "@tanstack/react-router"
import { InstantAuth } from "better-auth-instantdb/react"
import { ThemeProvider } from "next-themes"

import { db } from "@/db/instant"
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
        navigate={(href) => navigate({ href })}
        replace={(href) => navigate({ href, replace: true })}
        Link={({ href, ...props }) => <Link to={href} {...props} />}
      >
        <InstantAuth db={db} authClient={authClient} />

        {children}
      </AuthUIProvider>
    </ThemeProvider>
  )
}
