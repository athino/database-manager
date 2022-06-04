import {JSONSchemaType} from 'ajv'

type Database = {
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

export const databaseSchema: JSONSchemaType<Database> = {
    type: 'object',
    required: [],
    additionalProperties: false,
    minProperties: 4,
    properties: {
        name: {type: 'string'},
        id: {type: 'string'},
        packument: {type: 'string'},
        versions: {
            type: 'array',
            items: {
                type: 'object',
                required: ['version', 'status', 'methods', 'tables', 'latestUsage'],
                additionalProperties: false,
                properties: {
                    version: {type: 'string', pattern: '^[1-9][0-9]?\.[0-9]?\.[0-9]?$'},
                    tarball: {
                        type: 'object',
                        nullable: true,
                        required: [],
                        additionalProperties: false,
                        minProperties: 2,
                        properties: {
                            filename: {type: 'string', pattern: '^*\.tgz$'},
                            shasum: {type: 'string'}
                        }
                    },
                    status: {
                        type: 'string',
                        enum: ['unpublished', 'published', 'depricated']
                    },
                    methods: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [],
                            additionalProperties: false,
                            minProperties: 1,
                            properties: {
                                query: {type: 'string'}
                            }
                        }
                    },
                    tables: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [],
                            additionalProperties: false,
                            minProperties: 2,
                            properties: {
                                tableName: {type: 'string'},
                                columns: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: [],
                                        additionalProperties: false,
                                        minProperties: 2,
                                        properties: {
                                            columnName: {type: 'string'},
                                            type: {
                                                type: 'string',
                                                enum: ['boolean', 'number', 'string']
                                            } 
                                        }
                                    }
                                }
                            }
                        }
                    },
                    latestUsage: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [],
                            additionalProperties: false,
                            minProperties: 3,
                            properties: {
                                timestamp: {type: 'integer'},
                                usedBy: {type: 'string'}
                            }
                        }
                    }
                }
            }
        }
    }
}