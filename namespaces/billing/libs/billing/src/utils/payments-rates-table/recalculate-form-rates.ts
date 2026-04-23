import { AnyObject } from '@toptal/picasso-forms'

import { isCustomValuesRateMethod } from '../discountTierUtils'
import { updateFormFields, getFieldNameTypes, useLastField } from '.'
import { FieldName } from './types'
import RatesCalculator, { Source, Commitment } from './RatesCalculator'

type Props = {
  form: AnyObject
  modifiedFieldName: FieldName
  value: string
  calculator: RatesCalculator
  rateMethod?: string
  setFields: ReturnType<typeof useLastField>['setFields']
  lastFocusedFieldName: FieldName
}

const recalculateFormRates = ({
  form,
  modifiedFieldName,
  value,
  calculator,
  rateMethod,
  setFields,
  lastFocusedFieldName
}: Props) => {
  if (lastFocusedFieldName !== modifiedFieldName) {
    return
  }

  const { sourceType, commitmentType } = getFieldNameTypes(modifiedFieldName)

  if (sourceType && commitmentType) {
    const { calculatedRates } = calculator.recalculateRates(
      sourceType as Source,
      commitmentType as Commitment,
      Number(value),
      rateMethod
    )

    setFields({
      lastFocusedFieldName: modifiedFieldName as FieldName,
      lastModifiedFieldName: modifiedFieldName as FieldName,
      lastModifiedFieldValue: value
    })

    const autoCalculationEnabled = !isCustomValuesRateMethod(rateMethod)

    if (autoCalculationEnabled) {
      updateFormFields({ form, calculatedRates, modifiedFieldName })
    }
  }
}

export default recalculateFormRates
