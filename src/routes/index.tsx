import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Home
})

function Home() {
  return <div className="text-2xl font-bold">Hello World</div>
}
