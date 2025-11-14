import { useAuthenticate } from "@daveyplate/better-auth-ui"
import { createFileRoute } from "@tanstack/react-router"
import { PlusIcon } from "lucide-react"
import { useState } from "react"
import { v7 } from "uuid"
import { TodoItem } from "@/components/todos/todo-item"
import { TodoSkeleton } from "@/components/todos/todo-skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Todo } from "@/db/entity.types"
import { db } from "@/db/instant"
import { handleAction } from "@/lib/form-helpers"

export const Route = createFileRoute("/todos")({
  component: TodosPage
})

function TodosPage() {
  useAuthenticate()
  const { user } = db.useAuth()
  const [q, setQ] = useState("")

  const { data, isLoading } = db.useQuery({
    todos: {
      $: {
        where: { userId: user?.id, task: { $ilike: `%${q}%` } },
        order: { serverCreatedAt: "desc" }
      },
      user: {}
    }
  })

  const { todos } = data ?? {}

  const insertTodo = (todo: Todo) => {
    if (!user) return

    db.transact(
      db.tx.todos[v7()]
        .create({
          task: todo.task,
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
        <Input type="hidden" name="userId" defaultValue={user?.id} />

        <Input
          type="text"
          name="task"
          placeholder="Add a todo"
          autoComplete="off"
          disabled={!user}
          required
        />

        <Button disabled={!user}>
          <PlusIcon />
          Add
        </Button>
      </form>

      <Input
        type="text"
        name="task"
        placeholder="Search todos"
        autoComplete="off"
        disabled={!user}
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
