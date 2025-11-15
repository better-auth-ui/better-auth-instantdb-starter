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
      $default: "true"
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
      view: "isOwner || isOrganizationOwner",
      create: "isOwner || isOrganizationOwner",
      update:
        "(isOwner || isOrganizationOwner) && (isStillOwner || isStillOrganizationOwner)",
      delete: "isOwner || isOrganizationOwner"
    },
    bind: [
      "isOwner",
      "auth.id == data.userId && data.organizationId == null",
      "isStillOwner",
      "auth.id == newData.userId && newData.organizationId == null",
      "isOrganizationOwner",
      "data.organizationId in auth.ref('$user.members.organizationId')",
      "isStillOrganizationOwner",
      "newData.organizationId in auth.ref('$user.members.organizationId')"
    ]
  }
} satisfies InstantRules

export default rules
