import Schema from "common/external/schema";

type PackumentCheck = Array<{
    status: 'published' | 'depricated'
    major: number
    minor: number
    patch: number
    semver: string
    published: number
    shasum: string
}>

export const schema = new Schema<PackumentCheck>({
    type: 'array',
    items: {
        type: 'object',
        required: ['status', 'major', 'minor', 'patch', 'semver', 'published', 'shasum'],
        additionalProperties: true,
        properties: {
            status: {
                type: 'string',
                enum: ['published', 'depricated']
            },
            major: {
                type: 'integer',
                minimum: 1
            },
            minor: {
                type: 'integer',
                minimum: 0
            },
            patch: {
                type: 'integer',
                minimum: 0,
            },
            semver: {
                type: 'string',
                pattern: '^[1-9]d*.d+.d+$'
            },
            shasum: {
                type: 'string'
            },
            published: {
                type: 'integer'
            }
        }
    }
})