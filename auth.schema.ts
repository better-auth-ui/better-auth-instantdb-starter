// Docs: https://www.instantdb.com/docs/modeling-data

import { i } from "@instantdb/react"

export const authSchema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed().optional(),
      imageURL: i.string().optional(),
      type: i.string().optional(),
      name: i.string().indexed().optional(),
      emailVerified: i.boolean().optional(),
      image: i.string().optional(),
      createdAt: i.date().optional(),
      updatedAt: i.date().optional()
    }),
    sessions: i.entity({
      expiresAt: i.date(),
      token: i.string().unique(),
      createdAt: i.date(),
      updatedAt: i.date(),
      ipAddress: i.string().optional(),
      userAgent: i.string().optional(),
      userId: i.string(),
      activeOrganizationId: i.string().optional()
    }),
    accounts: i.entity({
      accountId: i.string(),
      providerId: i.string(),
      userId: i.string(),
      accessToken: i.string().optional(),
      refreshToken: i.string().optional(),
      idToken: i.string().optional(),
      accessTokenExpiresAt: i.date().optional(),
      refreshTokenExpiresAt: i.date().optional(),
      scope: i.string().optional(),
      password: i.string().optional(),
      createdAt: i.date(),
      updatedAt: i.date()
    }),
    verifications: i.entity({
      identifier: i.string(),
      value: i.string(),
      expiresAt: i.date(),
      createdAt: i.date(),
      updatedAt: i.date()
    }),
    organizations: i.entity({
      name: i.string().indexed(),
      slug: i.string().unique().indexed(),
      logo: i.string().optional(),
      createdAt: i.date(),
      metadata: i.string().optional()
    }),
    members: i.entity({
      organizationId: i.string(),
      userId: i.string(),
      role: i.string().indexed(),
      createdAt: i.date()
    }),
    invitations: i.entity({
      organizationId: i.string(),
      email: i.string().indexed(),
      role: i.string().optional().indexed(),
      status: i.string().indexed(),
      expiresAt: i.date(),
      inviterId: i.string()
    })
  },
  links: {
    sessionsUser: {
      forward: {
        on: "sessions",
        has: "one",
        label: "user",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "sessions"
      }
    },
    accountsUser: {
      forward: {
        on: "accounts",
        has: "one",
        label: "user",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "accounts"
      }
    },
    membersOrganization: {
      forward: {
        on: "members",
        has: "one",
        label: "organization",
        onDelete: "cascade"
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "members"
      }
    },
    membersUser: {
      forward: {
        on: "members",
        has: "one",
        label: "user",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "members"
      }
    },
    invitationsOrganization: {
      forward: {
        on: "invitations",
        has: "one",
        label: "organization",
        onDelete: "cascade"
      },
      reverse: {
        on: "organizations",
        has: "many",
        label: "invitations"
      }
    },
    invitationsUser: {
      forward: {
        on: "invitations",
        has: "one",
        label: "inviter",
        onDelete: "cascade"
      },
      reverse: {
        on: "$users",
        has: "many",
        label: "invitations"
      }
    }
  }
})
