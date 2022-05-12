import Ajv, {JSONSchemaType} from 'ajv'

const ajv = new Ajv()

type Database = {
    name: string
    versions: Array<{
        version: string
        status: 'unpublished' | 'published' | 'depricated'
        methods: Array<{
            methodName: string
        }>
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
            utcOffset: 0
        }>
    }>
}

const schema: JSONSchemaType<Database> = {
    type: 'object',
    required: [],
    additionalProperties: false,
    properties: {
        name: {type: 'string'},
        versions: {
            type: 'array',
            items: {
                type: 'object',
                required: [],
                additionalProperties: false,
                properties: {
                    version: {type: 'string', pattern: '^[1-9]\\d*\.\\d*\.\\d*$'},
                    status: {type: 'string', pattern: 'unpublished|published|depricated' },
                    methods: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['methodName'],
                            additionalProperties: false,
                            methodName: {type: 'string'}
                        }
                    },
                    latestUsage: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                timestamp: {type: 'integer'},
                                usedBy: {type: 'string'},
                                utcOffset: {type: 'integer'},
                            }
                        }
                    },
                    tables: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: [],
                            additionalProperties: false,
                            properties: {
                                tableName: {type: 'string'},
                                columns: {
                                    type: 'array',
                                    items: {
                                        type: 'object',
                                        required: ['columnName', 'type'],
                                        additionalProperties: false,
                                        properties: {
                                            columnName: {type: 'string'},
                                            type: {type: 'string', pattern: 'string|boolean|number|undefined' },
                                        },
                                    }
                                }
                            },
                        }
                    }
                },
            }
        }
    }
}

export const validateDatabase = ajv.compile(schema)