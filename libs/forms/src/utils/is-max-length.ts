import { FieldValidator } from '@toptal/picasso-forms'
import { NUMBER_OF_CHARACTER_LIMIT } from '@staff-portal/config'

export const isMaxLength = (
  value?: string | null
): ReturnType<FieldValidator<string | null | undefined>> => {
  if (typeof value === 'string' && value.length > NUMBER_OF_CHARACTER_LIMIT) {
    return `Please write less than ${NUMBER_OF_CHARACTER_LIMIT} characters`
  }
}
