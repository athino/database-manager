import Ajv, {JSONSchemaType} from "ajv"


export const createSchema = <T>() => {

    return (schema: JSONSchemaType<T>) => {
        const ajv = new Ajv()
    
        return {
            validate: ajv.compile(schema),
            build: (body: T) => body
        }
    }

}