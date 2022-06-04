

export type DatabaseType = {
    name: string
    id: string
    packument: string
    versions: Array<{
        version: string
        tarball?: {
            filename: string
            shasum: string
        }
        status: 'unpublished' | 'published' | 'depricated'
        methods: Array<{query: string}>
        tables: Array<{
            tableName: string,
            columns: Array<{
                columnName: string,
                type: 'boolean' | 'number' | 'string'
            }>
        }>
        latestUsage: Array<{
            timestamp: number
            usedBy: string
        }>
    }>
}