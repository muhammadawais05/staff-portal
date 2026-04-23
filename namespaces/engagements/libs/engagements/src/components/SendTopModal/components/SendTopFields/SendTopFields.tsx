import React, { useCallback } from 'react'
import { Form } from '@toptal/picasso-forms'
import { ReferralBonus16 } from '@toptal/picasso'
import {
  FULL_MONTH_DATE_FORMAT,
  parseAndFormatDate
} from '@staff-portal/date-time-utils'

import { formatTrialLength } from '../../../../services'

const SendTopFields = () => {
  const parseAndFormatDateWithFullMonth = useCallback(
    (date: string) =>
      parseAndFormatDate(date, { dateFormat: FULL_MONTH_DATE_FORMAT }),
    []
  )

  return (
    <>
      <Form.NumberInput
        width='full'
        name='number'
        data-testid='SendTopForm-number'
        label='Number'
        min='1'
        hideControls
        required
        autoFocus
      />
      <Form.Input
        width='full'
        name='descriptionOfService'
        data-testid='SendTopForm-description-of-service'
        label='Description of service'
        required
      />
      <Form.Input
        width='full'
        name='talentName'
        data-testid='SendTopForm-talent-name'
        label='Talent name'
        required
      />
      <Form.Input
        width='full'
        disabled
        name='clientName'
        label='Company legal name'
      />
      <Form.Input
        width='full'
        disabled
        name='nextTopEffectiveDate'
        label='Effective date'
        format={parseAndFormatDateWithFullMonth}
      />
      <Form.Input
        width='full'
        disabled
        name='talentStartDate'
        label='Talent start date'
        format={parseAndFormatDateWithFullMonth}
      />
      <Form.Input
        width='full'
        disabled
        name='trialLength'
        label='Trial period length'
        format={formatTrialLength}
      />
      <Form.Input
        width='full'
        disabled
        name='trialEndDate'
        label='Trial end date'
        format={parseAndFormatDateWithFullMonth}
      />
      <Form.NumberInput
        // type='text' passed for displaying dot as decimal separator
        // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
        type='text'
        width='full'
        disabled
        name='companyHourlyRate'
        label='Hourly fee'
        icon={<ReferralBonus16 />}
      />
      <Form.NumberInput
        // type='text' passed for displaying dot as decimal separator
        // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
        type='text'
        width='full'
        disabled
        name='companyPartTimeRate'
        label='Weekly part time fee'
        icon={<ReferralBonus16 />}
      />
      <Form.NumberInput
        // type='text' passed for displaying dot as decimal separator
        // TODO: remove type='text' after https://toptal-core.atlassian.net/browse/FX-1703
        type='text'
        width='full'
        disabled
        name='companyFullTimeRate'
        label='Weekly full time fee'
        icon={<ReferralBonus16 />}
      />
      <Form.RadioGroup label='Send to myself' name='sendToPerformer' horizontal>
        <Form.Radio label='Yes' value='true' />
        <Form.Radio label='No' value='false' />
      </Form.RadioGroup>
    </>
  )
}

export default SendTopFields
