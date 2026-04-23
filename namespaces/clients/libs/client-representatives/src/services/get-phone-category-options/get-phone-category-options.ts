import { CompanyRepresentativePhoneInput } from '@staff-portal/graphql/staff'

import { PHONE_CATEGORY_ITEMS } from '../../constants'

type Props = {
  itemIndex: number
  items: CompanyRepresentativePhoneInput[]
}

export const getPhoneCategoryOptions = ({
  itemIndex,
  items: existingPhones
}: Props) => {
  const usedCategories = existingPhones
    .filter(({ destroy }, index) => !destroy && index !== itemIndex)
    .map(phone => phone.phoneCategory)

  return PHONE_CATEGORY_ITEMS.map(option => {
    if (usedCategories.includes(option.value)) {
      return { ...option, disabled: true }
    }

    return { ...option, disabled: false }
  })
}
