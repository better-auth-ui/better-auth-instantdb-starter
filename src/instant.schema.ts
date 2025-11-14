// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react"
import { authSchema } from "../auth.schema"

const _schema = i.schema({
  entities: {
    ...authSchema.entities,
    $files: i.entity({
      path: i.string().unique().indexed(),
      url: i.string()
    }),
    todos: i.entity({
      task: i.string().indexed(),
      isComplete: i.boolean(),
      userId: i.string(),
      createdAt: i.date(),
      updatedAt: i.date()
    })
  },
  links: {
    $usersLinkedPrimaryUser: {
      forward: {
        on: "$users",
        has: "one",
        label: "linkedPrimaryUser",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "linkedGuestUsers"
      }
    },
    todosUser: {
      forward: {
        on: "todos",
        has: "one",
        label: "user",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "todos"
      }
    }
  },
  rooms: {}
})

// This helps Typescript display nicer intellisense
type _AppSchema = typeof _schema
interface AppSchema extends _AppSchema {}
const schema: AppSchema = _schema

export type { AppSchema }
export default schema
