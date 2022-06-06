import Ajv, {JSONSchemaType} from "ajv"


export class SchemaClass<T> {

    constructor(schema: JSONSchemaType<T>) {
        const ajv = new Ajv()
        const _this = Object.assign({
            validate: ajv.compile(schema),
            build: (body: T) => body
        }, this)
        return _this
    }

}
