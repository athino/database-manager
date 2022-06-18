import Schema from "common/external/schema";

type DatatabseVersionsCheck = {
    versions: Array<{
        status: 'unpublished' | 'published' | 'depricated'
    }>
}

export const schema = new Schema<DatatabseVersionsCheck>({
    type: 'object',
    required: ['versions'],
    additionalProperties: true,
    properties: {
        versions: {
            type: 'array',
            items: {
                type: 'object',
                required: ['status'],
                additionalProperties: true,
                properties: {
                    status: {
                        type: 'string',
                        enum: ['unpublished', 'published', 'depricated']
                    }
                }
            }
        }
    }
})