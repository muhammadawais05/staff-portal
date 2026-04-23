import { string } from 'yup'

export const createStringValidator = ({
  acceptedValues
}: {
  acceptedValues?: string[]
} = {}) => {
  let validator = string()

  if (acceptedValues?.length) {
    validator = validator.oneOf(acceptedValues)
  }

  return validator
}
