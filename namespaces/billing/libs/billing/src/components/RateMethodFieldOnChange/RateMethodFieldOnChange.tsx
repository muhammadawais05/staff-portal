import { AnyObject, OnChange } from '@toptal/picasso-forms'
import React from 'react'
import { camelCase } from 'lodash-es'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

import {
  FieldName,
  useLastField,
  RatesCalculator,
  recalculateFormRates
} from '../../utils/payments-rates-table'

type Props = {
  form: AnyObject
  lastFocusedFieldName: FieldName
  calculator: RatesCalculator
  setFields: ReturnType<typeof useLastField>['setFields']
  callback?: () => void
}

const RateMethodFieldOnChange = ({
  form,
  lastFocusedFieldName,
  calculator,
  setFields,
  callback
}: Props) => (
  <OnChange name='rateMethod'>
    {(value?: EngagementRateMethodEnum | string | null) => {
      recalculateFormRates({
        form,
        modifiedFieldName: 'talentHourlyRate',
        value: `${calculator.state.calculatedRates.talent.hourly}`,
        calculator,
        rateMethod: value ? camelCase(value) : undefined,
        setFields,
        lastFocusedFieldName
      })
      callback?.()
    }}
  </OnChange>
)

export default RateMethodFieldOnChange
