import Schema from "common/external/schema";

type Database = {
    name: string
    versions: {
        ['1.0.0']: {
            semver: '1.0.0'
            major: 1
            minor: 0
            patch: 0
            status: 'unpublished'
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
            required: ['1.0.0'],
            additionalProperties: false,
            minProperties: 1,
            properties: {
                '1.0.0': {
                    type: 'object',
                    required: ['semver', 'major', 'minor', 'patch', 'status'],
                    additionalProperties: false,
                    properties: {
                        semver: {type: 'string', const: '1.0.0'},
                        major: {type: 'integer', const: 1},
                        minor: {type: 'integer', const: 0},
                        patch: {type: 'integer', const: 0},
                        status: {type: 'string', const: 'unpublished'},
                    }
                },
            }
        }
    }
})