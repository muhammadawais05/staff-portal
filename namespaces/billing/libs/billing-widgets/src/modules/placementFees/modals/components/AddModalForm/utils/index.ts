import { isEmpty } from 'lodash-es'
import { AnyObject } from '@toptal/picasso-forms'

import { PlacementFeeInput } from '../../AddModal/AddModal'

export type PlacementFeeValidParams = {
  values: PlacementFeeInput
  blur: (name: keyof PlacementFeeInput) => void
  errors?: AnyObject
}

export const getIsValidForm = ({
  values,
  blur,
  errors
}: PlacementFeeValidParams) => {
  values.installments.forEach((_, index) => {
    blur(`installments[${index}].dueDate` as unknown as keyof PlacementFeeInput)
    blur(`installments[${index}].amount` as unknown as keyof PlacementFeeInput)
  })

  return isEmpty(errors)
}
