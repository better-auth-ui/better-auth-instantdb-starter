import { useAuthenticate } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { v7 } from "uuid"
import { TodoItem } from "@/components/todos/todo-item"
import { TodoSkeleton } from "@/components/todos/todo-skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/database/db"
import { handleAction } from "@/lib/form-helpers"

export const Route = createFileRoute("/todos")({
  component: TodosPage
})

function TodosPage() {
  const { user } = useAuthenticate()
  const [q, setQ] = useState("")

  const { data, isLoading } = db.useQuery(
    user
      ? {
          todos: {
            $: {
              where: { userId: user?.id, task: { $ilike: `%${q}%` } },
              order: { serverCreatedAt: "desc" }
            },
            user: {}
          }
        }
      : null
  )

  const todos = data?.todos

  const insertTodo = ({ task }: { task: string }) => {
    if (!user) return

    db.transact(
      db.tx.todos[v7()]
        .create({
          task: task,
          userId: user.id,
          isComplete: false,
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .link({ user: user.id })
    )
  }

  return (
    <main className="container mx-auto flex flex-col gap-4 p-safe-or-4 md:p-safe-or-6">
      <form action={handleAction(insertTodo)} className="flex gap-3">
        <Input
          type="text"
          name="task"
          placeholder="Add a todo"
          autoComplete="off"
          required
        />

        <Button>
          <PlusIcon />
          Add
        </Button>
      </form>

      <Input
        type="text"
        name="task"
        placeholder="Search todos"
        autoComplete="off"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <div className="flex flex-col gap-4">
        {isLoading && !todos?.length ? (
          [...Array(3)].map((_, index) => (
            <TodoSkeleton key={index.toString()} />
          ))
        ) : todos?.length === 0 ? (
          <p>No todos</p>
        ) : (
          todos?.map((todo) => <TodoItem key={todo.id} todo={todo} />)
        )}
      </div>
    </main>
  )
}
