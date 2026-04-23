import { AnyObject } from '@toptal/picasso-forms'
import { omit } from 'lodash-es'

const adjustValues = (formValues: AnyObject, usaCountryId: string) => {
  const keysToOmit = ['billingStateInput', 'billingStateSelect']
  const billingState =
    usaCountryId === formValues.billingCountryId
      ? formValues.billingStateSelect
      : formValues.billingStateInput || ''

  return omit({ ...formValues, billingState }, keysToOmit)
}

export default adjustValues
