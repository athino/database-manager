
export type Database = {
  name: string
  isBeingDeleted: boolean
  isBeingUpdated: boolean
  activeVersionSemver: string
  createdAt: number
  versions: {
    [id: string]: {
      semver: string
      id: string
      status: string
      isBeingPublished: boolean
    }
  }
}

export type Databases = {
  [name: string]: Database
}