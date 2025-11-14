import { createFileRoute } from "@tanstack/react-router"
import { ModeToggle } from "@/components/mode-toggle"

export const Route = createFileRoute("/")({
  component: Home
})

function Home() {
  return (
    <div className="text-2xl font-bold">
      Hello World <ModeToggle />
    </div>
  )
}
