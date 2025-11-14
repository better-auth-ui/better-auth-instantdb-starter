import type { InstaQLEntity } from "@instantdb/react"
import type { AppSchema } from "@/instant.schema"

export type User = InstaQLEntity<AppSchema, "$users", object, undefined, true>
export type Todo = InstaQLEntity<AppSchema, "todos", object, undefined, true>
