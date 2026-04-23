import { AnyObject, OnChange } from '@toptal/picasso-forms'
import React from 'react'
import { camelCase } from 'lodash-es'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import { cleanNumberValue } from '../../_lib/form/handlers'
import {
  useLastField,
  FieldName,
  updateFormFields,
  discountFieldsNames,
  recalculateFormRates,
  RatesCalculator
} from '../../utils/payments-rates-table'

type Props = {
  name: FieldName
  form: AnyObject
  calculator: RatesCalculator
  lastFocusedFieldName: FieldName
  setFields: ReturnType<typeof useLastField>['setFields']
  rateMethod?: EngagementRateMethodEnum | string
  callback?: () => void
}

const RateFieldOnChange = ({
  name,
  form,
  calculator,
  lastFocusedFieldName,
  setFields,
  rateMethod,
  callback
}: Props) => (
  <OnChange name={name}>
    {(value: string) => {
      const cleanedValue = cleanNumberValue(value)
      const isDiscountField = discountFieldsNames.includes(name as FieldName)

      if (value !== cleanedValue) {
        form.change(name, cleanedValue)
      } else {
        recalculateFormRates({
          form,
          modifiedFieldName: name,
          value,
          calculator,
          rateMethod: rateMethod ? camelCase(rateMethod) : undefined,
          lastFocusedFieldName,
          setFields
        })
      }

      if (isDiscountField) {
        calculator.updateFromDiscount()
        updateFormFields({
          form,
          calculatedRates: calculator.state.calculatedRates,
          modifiedFieldName: name
        })
      }

      callback?.()
    }}
  </OnChange>
)

export default RateFieldOnChange
