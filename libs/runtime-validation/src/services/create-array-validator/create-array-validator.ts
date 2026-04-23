import { AnySchema, array } from 'yup'

export const createArrayValidator = (schemaOf?: AnySchema) => array(schemaOf)
