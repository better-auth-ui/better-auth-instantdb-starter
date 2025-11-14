import type {
  EntitiesDef,
  InstantConfig,
  InstantReactWebDatabase,
  InstantSchemaDef,
  InstaQLParams,
  InstaQLResult,
  LinksDef,
  RoomsDef
} from "@instantdb/react"
import { db } from "@/database/db"

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
  table: TTable,
  params: TParams = {} as TParams
) {
  type Query = { [K in TTable]: NonNullable<TParams> }
  type QueryResult = InstaQLResult<
    TSchema,
    Query & InstaQLParams<TSchema>,
    NonNullable<TConfig["useDateObjects"]>
  >
  type TEntity = QueryResult[TTable] extends (infer U)[] ? U : never

  const result = database.useQuery({ [table]: params } as Parameters<
    typeof database.useQuery
  >[0])

  return {
    ...result,
    data: result.data?.[table] as TEntity[] | undefined
  }
}

function TestComponent() {
  const { data: todos, isLoading } = useEntities(db, "todos", {
    user: {}
  })
}
