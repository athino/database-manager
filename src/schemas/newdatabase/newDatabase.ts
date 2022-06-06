import Schema from "common/external/schema";

type NewDatabase = {
    name: string
    id: string
    packument: string
    versions: [{
        version: '1.0.0'
        tarball: undefined
        status: 'unpublished'
        methods: []
        tables: []
        latestUsage: []
    }]
}

export const schema = new Schema<NewDatabase>({
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
                    version: {
                        type: 'string',
                        const: '1.0.0'
                    },
                    tarball: {
                        type: 'undefined',
                        const: undefined
                    },
                    status: {
                        type: 'string',
                        const: 'unpublished'
                    },
                    methods: {
                        type: 'array',
                        const: []

                    },
                    tables: {
                        type: 'array',
                        const: []
                    },
                    latestUsage: {
                        type: 'array',
                        const: []
                    }
                }
            }
        }
    }
})