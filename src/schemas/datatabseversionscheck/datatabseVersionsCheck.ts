import Schema from "common/external/schema";

type DatatabseVersionsCheck = {
    versions: {
        [id: string]: {
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
            required: ['1-0-0'],
            minProperties: 1,
            patternProperties: {
                '^[1-9]d*-d+-d+$': {
                    type: 'object',
                    required: ['status'],
                    properties: {
                        status: {type: 'string'}
                    }
                }
            }
        }
    }
})