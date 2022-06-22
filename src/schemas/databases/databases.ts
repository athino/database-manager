import Schema from "common/external/schema";

type Databases = Array<{
    name: string
    createdAt: number
    versions: {
        [id: string]: {
            semver: string
            id: string
            major: number
            minor: number
            patch: number
            status: 'unpublished' | 'published' | 'depricated'
            published?: number
            shasum?: string
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
                    '^[1-9][0-9]*.[0-9]+.[0-9]+$': {
                        type: 'object',
                        required: ['semver', 'id', 'major', 'minor', 'patch', 'status'],
                        additionalProperties: false,
                        properties: {
                            semver: {type: 'string', pattern: '^[1-9][0-9]*.[0-9]+.[0-9]+$'},
                            id: {type: 'string', pattern: '^[1-9][0-9]*-[0-9]+-[0-9]+$'},
                            major: {type: 'integer', minimum: 1},
                            minor: {type: 'integer', minimum: 0},
                            patch: {type: 'integer', minimum: 0},
                            status: {type: 'string', enum: ['unpublished', 'published', 'depricated']},
                            published: {type: 'integer', nullable: true},
                            shasum: {type: 'string', nullable: true}
                        }
                    },
                }
            }
        }
    }
})