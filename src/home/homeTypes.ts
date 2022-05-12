
export type ClientDatabase = {
  name: string
  id: string
  isBeingDeleted: boolean
  isBeingUpdated: boolean
  activeVersion?: ClientVersion
  versions: Array<ClientVersion>
}

export type ClientVersion = {
  version: string
  packageUrl: string
  status: string
  isBeingPublished: boolean
  tables: Array<{
    tableName: string
    columns: Array<{
      columnName: string
      type: string
    }>
  }>
  methods: any[]
}