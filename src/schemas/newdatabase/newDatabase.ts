import Schema from "common/external/schema";

type NewDatabase = {
    name: string
    versions: Array<{
        semver: string
        status: 'unpublished'
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

export const schema = new Schema<NewDatabase>({
    type: 'object',
    required: [],
    additionalProperties: false,
    minProperties: 4,
    properties: {
        name: {type: 'string', pattern: '^[a-z]+(-[a-z]+)*$'},
        versions: {
            type: 'array',
            maxItems: 1,
            minItems: 1,
            items: {
                type: 'object',
                required: ['semver', 'status', 'methods', 'tables', 'latestUsage'],
                additionalProperties: false,
                properties: {
                    semver: {type: 'string', pattern: '^[1-9]d*.d+.d+$'},
                    status: {
                        type: 'string',
                        const: 'unpublished'
                    },
                    methods: {
                        type: 'array',
                        maxItems: 0,
                        minItems: 0,
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
                        maxItems: 0,
                        minItems: 0,
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
                        maxItems: 0,
                        minItems: 0,
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
})