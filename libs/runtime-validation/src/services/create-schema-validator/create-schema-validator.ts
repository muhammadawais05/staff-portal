import { SchemaType, SpecificSchemaValidationProps } from '../../types'
import { getSchemaValidator } from '../get-schema-validator/get-schema-validator'

type Props = SpecificSchemaValidationProps & {
  type?: SchemaType
  required?: boolean
  nullable?: boolean
}

export const createSchemaValidator = ({
  type = 'string',
  required = false,
  nullable = false,
  acceptedValues,
  schemaOf
}: Props) => {
  let validator = getSchemaValidator(type, { acceptedValues, schemaOf })

  if (required) {
    validator = validator.required()
  }

  if (nullable) {
    validator = validator.nullable()
  }

  return validator
}
