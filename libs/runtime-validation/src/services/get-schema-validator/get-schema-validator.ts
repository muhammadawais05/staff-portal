import { mixed } from 'yup'

import { SchemaType, SpecificSchemaValidationProps } from '../../types'
import { createArrayValidator } from '../create-array-validator/create-array-validator'
import { createStringValidator } from '../create-string-validator/create-string-validator'

export const getSchemaValidator = (
  type: SchemaType,
  { acceptedValues, schemaOf }: Partial<SpecificSchemaValidationProps> = {}
) => {
  switch (type) {
    case 'array':
      return createArrayValidator(schemaOf)
    case 'mixed':
      return mixed()
    case 'string':
    default:
      return createStringValidator({ acceptedValues })
  }
}
