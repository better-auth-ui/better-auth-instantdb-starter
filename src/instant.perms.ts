// Docs: https://www.instantdb.com/docs/permissions

import type { InstantRules } from "@instantdb/react"

const rules = {
  attrs: {
    allow: {
      $default: "false"
    }
  },
  $default: {
    allow: {
      $default: "false"
    }
  },
  $users: {
    allow: {
      view: "true"
    },
    fields: {
      email: "auth.id == data.id",
      emailVerified: "auth.id == data.id"
    }
  },
  todos: {
    allow: {
      view: "auth.id != null",
      create: "isOwner",
      update: "isOwner && isStillOwner",
      delete: "isOwner"
    },
    bind: [
      "isOwner",
      "auth.id != null && auth.id == data.userId",
      "isStillOwner",
      "auth.id != null && auth.id == data.userId"
    ]
  }
} satisfies InstantRules

export default rules
