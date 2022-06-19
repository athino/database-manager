import Schema from "common/external/schema";

type DatatabseVersionsCheck = {
    versions: {
        [semver: string]: {
            status: string
        }
    }
}

export const schema = new Schema<DatatabseVersionsCheck>({
    type: 'object',
    required: ['versions'],
    additionalProperties: true,
    properties: {
        versions: {
            type: 'object',
            required: [],
            additionalProperties: false,
            minProperties: 1,
            patternProperties: {
                '^[1-9]d*.d+.d+$': {
                    type: 'object',
                    required: [],
                    properties: {
                        status: {type: 'string'}
                    }
                }
            }
        }
    }
})