import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import { Option } from '@staff-portal/billing/src/@types/types'

export const getSelectedOptionText = (
  options: Option[] = [],
  optionId?: string
) => {
  if (optionId === '') {
    return EMPTY_DATA
  }

  const selectedOption = options.find(({ value }) => value === optionId)

  return selectedOption ? selectedOption.text : EMPTY_DATA
}
