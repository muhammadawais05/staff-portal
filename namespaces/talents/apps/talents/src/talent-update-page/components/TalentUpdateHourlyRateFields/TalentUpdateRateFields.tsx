import React, { useRef, useMemo } from 'react'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { Form, useField } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { Operation } from '@staff-portal/graphql/staff'

import {
  HOURLY_RATE_COMMENT_FIELD,
  HOURLY_RATE_DISCUSSED_FIELD,
  HOURLY_RATE_FIELD,
  HOURLY_RATE_FIRST_CONTACT_DATE_FIELD
} from '../../config'
import { TalentUpdateFormValues } from '../../types'

type Props = {
  updateTalentHourlyRate?: Operation
}

export const TalentUpdateHourlyRateFields = ({
  updateTalentHourlyRate: updateTalentHourlyRateOperation
}: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const maxDate = useMemo(() => new Date(), [])
  const {
    input: { value: hourlyRate }
  } = useField<TalentUpdateFormValues[typeof HOURLY_RATE_FIELD]>(
    HOURLY_RATE_FIELD,
    {
      subscription: { value: true }
    }
  )
  const initalValue = useRef(hourlyRate)
  const showExtraFields = Number(initalValue.current) !== Number(hourlyRate)

  return (
    <>
      <GridItemField
        label='Hourly rate'
        labelFor={HOURLY_RATE_FIELD}
        size='small'
      >
        <Form.NumberInput
          name={HOURLY_RATE_FIELD}
          width='full'
          step='any'
          icon={<ReferralBonus16 />}
          hideControls
          disabled={!isOperationEnabled(updateTalentHourlyRateOperation)}
        />
      </GridItemField>
      {showExtraFields && (
        <>
          <GridItemField label='Hourly rate update comment' required>
            <Form.Input
              name={HOURLY_RATE_COMMENT_FIELD}
              rows={3}
              rowsMax={5}
              width='full'
              multiline
              multilineResizable
              required
            />
          </GridItemField>
          <GridItemField
            label='Date talent first contacted'
            labelFor={HOURLY_RATE_FIRST_CONTACT_DATE_FIELD}
            size='small'
            required
          >
            <FormDatePickerWrapper
              id={HOURLY_RATE_FIRST_CONTACT_DATE_FIELD}
              name={HOURLY_RATE_FIRST_CONTACT_DATE_FIELD}
              width='full'
              required
              maxDate={maxDate}
            />
          </GridItemField>
          <GridItemField
            label='Did we discuss or negotiate the rate with talent?'
            labelFor={HOURLY_RATE_DISCUSSED_FIELD}
            required
          >
            <Form.RadioGroup
              id={HOURLY_RATE_DISCUSSED_FIELD}
              name={HOURLY_RATE_DISCUSSED_FIELD}
              horizontal
              required
            >
              <Form.Radio label='Yes' value='YES' />
              <Form.Radio label='No' value='NO' />
            </Form.RadioGroup>
          </GridItemField>
        </>
      )}
    </>
  )
}

export default TalentUpdateHourlyRateFields
