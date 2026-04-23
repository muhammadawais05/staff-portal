import { AnyObject, OnChange } from '@toptal/picasso-forms'
import React from 'react'
import { camelCase } from 'lodash-es'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import { cleanNumberValue } from '../../_lib/form/handlers'
import {
  useLastField,
  RatesCalculator,
  recalculateFormRates
} from '../../utils/payments-rates-table'

type Props = {
  form: AnyObject
  calculator: RatesCalculator
  setFields: ReturnType<typeof useLastField>['setFields']
  updateField: ReturnType<typeof useLastField>['updateField']
  rateMethod?: EngagementRateMethodEnum | string
  callback?: () => void
}

const MarkupFieldOnChange = ({
  form,
  calculator,
  setFields,
  updateField,
  rateMethod,
  callback
}: Props) => (
  <OnChange name='markup'>
    {(value?: string) => {
      const cleanedValue = cleanNumberValue(value ?? '')

      if (value !== cleanedValue) {
        return form.change('markup', cleanedValue)
      }

      // Recalculates company rates when markup is updated
      calculator.state.markup = Number(value)

      recalculateFormRates({
        form,
        modifiedFieldName: 'talentHourlyRate',
        value: `${calculator.state.calculatedRates.talent.hourly}`,
        calculator,
        rateMethod: rateMethod ? camelCase(rateMethod) : undefined,
        setFields,
        lastFocusedFieldName: 'talentHourlyRate'
      })
      updateField('lastFocusedFieldName', 'talentHourlyRate')

      callback?.()
    }}
  </OnChange>
)

export default MarkupFieldOnChange
