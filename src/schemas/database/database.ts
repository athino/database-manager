import Schema from "common/external/schema";

type Database = {
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
        }
    }
}

export const schema = new Schema<Database>({
    type: 'object',
    required: ['name', 'versions'],
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
                    }
                },
            }
        }
    }
})