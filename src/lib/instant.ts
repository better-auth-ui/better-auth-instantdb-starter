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
  TTable extends keyof TSchema["entities"] & string,
  TParams extends
    InstaQLParams<TSchema>[TTable] = InstaQLParams<TSchema>[TTable]
>(
  database: InstantReactWebDatabase<TSchema, TConfig>,
  table?: TTable | false | null | 0 | "",
  query: { [K in TTable]: TParams } extends ValidQuery<
    { [K in TTable]: TParams },
    TSchema
  >
    ? TParams
    : never = {} as any
) {
  const result = database.useQuery(table ? ({ [table]: query } as any) : null)

  type QueryForResult = { [K in TTable]: TParams } & InstaQLParams<TSchema>
  type FullQueryResult = InstaQLResult<
    TSchema,
    QueryForResult,
    NonNullable<TConfig["useDateObjects"]>
  >

  type TEntity = FullQueryResult[TTable] extends (infer U)[] ? U : never

  return {
    ...result,
    data: (table && (result.data?.[table] as TEntity[])) || undefined
  }
}
