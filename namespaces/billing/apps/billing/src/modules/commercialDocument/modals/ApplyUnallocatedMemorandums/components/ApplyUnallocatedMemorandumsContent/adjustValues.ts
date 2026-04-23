import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const adjustValues = (formValues: AnyObject) => {
  const keysToOmit = ['creditMemorandums', 'debitMemorandums']

  return omit(
    {
      ...formValues,
      memorandumIdsToAllocate: [
        ...formValues.creditMemorandums,
        ...formValues.debitMemorandums
      ]
    },
    keysToOmit
  )
}

export default adjustValues
