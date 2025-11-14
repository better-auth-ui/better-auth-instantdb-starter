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
      userId: i.string()
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
    })
  }
})
