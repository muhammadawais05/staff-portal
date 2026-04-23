import { BASE_ERROR_KEY, ORIGINAL_ERRORS_KEY } from '../../config'

export const concatUnexpectedValidationErrors = (
  validationErrors: Record<string, string>,
  formFieldNames: string[]
) =>
  Object.keys(validationErrors)
    .map(key => {
      if (key !== BASE_ERROR_KEY && key !== ORIGINAL_ERRORS_KEY && !formFieldNames.includes(key)) {
        return validationErrors[key]
      }

      return undefined
    })
    .filter(Boolean)
    .join(', ')
