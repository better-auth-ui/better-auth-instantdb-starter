/** biome-ignore-all lint/suspicious/noExplicitAny: any thing goes */
import type {
  EntitiesDef,
  InstantConfig,
  InstantReactWebDatabase,
  InstantSchemaDef,
  InstaQLParams,
  InstaQLResult,
  LinksDef,
  RoomsDef,
  ValidQuery
} from "@instantdb/react"

export function useEntities<
  TSchema extends InstantSchemaDef<
    EntitiesDef,
    LinksDef<EntitiesDef>,
    RoomsDef
  >,
  TConfig extends InstantConfig<TSchema, boolean>,
  TNamespace extends keyof TSchema["entities"] & string,
  TParams extends
    InstaQLParams<TSchema>[TNamespace] = InstaQLParams<TSchema>[TNamespace]
>(
  database: InstantReactWebDatabase<TSchema, TConfig>,
  table?: TNamespace | false | null | 0 | "",
  query: { [K in TNamespace]: TParams } extends ValidQuery<
    { [K in TNamespace]: TParams },
    TSchema
  >
    ? TParams
    : never = {} as any
) {
  const result = database.useQuery(table ? ({ [table]: query } as any) : null)

  type QueryForResult = { [K in TNamespace]: TParams } & InstaQLParams<TSchema>
  type FullQueryResult = InstaQLResult<
    TSchema,
    QueryForResult,
    NonNullable<TConfig["useDateObjects"]>
  >

  type TEntity = FullQueryResult[TNamespace] extends (infer U)[] ? U : never

  return {
    ...result,
    data: (table && (result.data?.[table] as TEntity[])) || undefined
  }
}
