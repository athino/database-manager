import {JSONSchemaType} from "ajv"

type Database = {
    name: string
    id: string
    versions: Array<{
        version: string
        status: 'unpublished' | 'published' | 'depricated'
        methods: Array<{query: string}>
        tables: Array<{
            tableName: string,
            columns: Array<{
                columnName: string,
                type: 'string' | 'boolean' | 'number' | 'undefined'
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
    minProperties: 3,
    properties: {
        name: {type: 'string'},
        id: {type: 'string'},
        versions: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                additionalProperties: false,
                minProperties: 5,
                properties: {
                    version: {type: 'string', pattern: ''},
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
                                            type: {type: 'string'}  // 'string' | 'boolean' | 'number' | 'undefined'
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