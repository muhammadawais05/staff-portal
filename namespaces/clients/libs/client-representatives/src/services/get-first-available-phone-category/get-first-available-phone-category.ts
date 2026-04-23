import { CompanyRepresentativePhoneInput } from '@staff-portal/graphql/staff'

import { PHONE_CATEGORY_ITEMS } from '../../constants'

export const getFirstAvailablePhoneCategory = (
  items: CompanyRepresentativePhoneInput[]
): CompanyRepresentativePhoneInput => {
  const existingPhoneCategories = new Set(
    items.map(({ phoneCategory }) => phoneCategory).filter(Boolean)
  )
  const nextPhoneCategory = PHONE_CATEGORY_ITEMS.filter(
    ({ value: phoneCategory }) => !existingPhoneCategories.has(phoneCategory)
  ).shift()

  return {
    value: '',
    phoneCategory: nextPhoneCategory?.value,
    primary: !items.length
  }
}
