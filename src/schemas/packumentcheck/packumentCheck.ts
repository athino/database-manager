import Schema from "common/external/schema";

type PackumentCheck = Array<{
    status: 'published' | 'depricated'
    major: number
    minor: number
    patch: number
    id: string
    semver: string
    shasum: string
    published: number
}>

export const schema = new Schema<PackumentCheck>({
    type: 'array',
    items: {
        type: 'object',
        required: ['status', 'major', 'minor', 'patch', 'id', 'semver', 'shasum', 'published'],
        additionalProperties: false,
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
            id: {
                type: 'string',
                pattern: '^[1-9][0-9]*-[0-9]+-[0-9]+$'
            },
            semver: {
                type: 'string',
                pattern: '^[1-9][0-9]*.[0-9]+.[0-9]+$'
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