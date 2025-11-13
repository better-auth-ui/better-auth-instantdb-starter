/// <reference types="vite/client" />
import { TanStackDevtools } from "@tanstack/react-devtools"
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts
} from "@tanstack/react-router"
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools"
import type { ReactNode } from "react"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "TanStack Start Starter"
      }
    ]
  }),
  component: RootComponent
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}

        <Scripts />

        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />
            }
          ]}
        />
      </body>
    </html>
  )
}
