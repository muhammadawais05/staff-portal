import { AnySchema } from 'yup'

export type SchemaType = 'string' | 'mixed' | 'array'

export type SpecificSchemaValidationProps = {
  acceptedValues?: string[]
  schemaOf?: AnySchema
}
