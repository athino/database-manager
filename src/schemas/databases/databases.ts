import Schema from "common/external/schema";

type Databases = Array<{
    name: string
    createdAt: number
    versions: {
        [semver: string]: {
            semver: string
            major: number
            minor: number
            patch: number
            status: 'unpublished' | 'published' | 'depricated'
        }
    }
}>

export const schema = new Schema<Databases>({
    type: 'array',
    items: {
        type: 'object',
        required: ['name', 'createdAt', 'versions'],
        additionalProperties: false,
        properties: {
            name: {type: 'string', pattern: '^[a-z]+(-[a-z]+)*$'},
            createdAt: {type: 'integer'},
            versions: {
                type: 'object',
                required: [],
                minProperties: 1,
                patternProperties: {
                    '^[1-9]d*.d+.d+$': {
                        type: 'object',
                        required: ['semver', 'major', 'minor', 'patch', 'status'],
                        additionalProperties: false,
                        properties: {
                            semver: {type: 'string', pattern: '^[1-9]d*.d+.d+$'},
                            major: {type: 'integer', minimum: 1},
                            minor: {type: 'integer', minimum: 0},
                            patch: {type: 'integer', minimum: 0},
                            status: {type: 'string', enum: ['unpublished', 'published', 'depricated']},
                        }
                    },
                }
            }
        }
    }
})