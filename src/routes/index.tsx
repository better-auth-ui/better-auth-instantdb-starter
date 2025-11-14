import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home
})

function Home() {
  return (
    <div className="text-2xl font-bold text-center p-4 md:p-6">Hello World</div>
  )
}
