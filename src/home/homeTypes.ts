
export type Database = {
  name: string
  isBeingDeleted: boolean
  isBeingUpdated: boolean
  activeVersionSemver: string
  versions: {
    [semver: string]: {
      semver: string
      status: string
      isBeingPublished: boolean
    }
  }
}

export type Databases = {
  [name: string]: Database
}