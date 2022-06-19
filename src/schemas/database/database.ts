import Schema from "common/external/schema";

type Database = {
    name: string
    versions: {
        [semver: string]: {
            semver: string
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
        versions: {
            type: 'object',
            required: [],
            additionalProperties: false,
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
})