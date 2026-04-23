import React, { useMemo } from 'react'
import { ReferralBonus16 } from '@toptal/picasso/Icon'
import { Form } from '@toptal/picasso-forms'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { RateChangeRequestTypeEnum, Scalars } from '@staff-portal/graphql/staff'

import { RateChangeRequestFragment } from '../../../../data'

export interface CompleteRateChangeRequestForm {
  outcomeRate: string
  claimerComment: string
  talentFirstContactedDate: Scalars['Date']
  rateNegotiated: boolean
  setRecommendedRateToProfile: boolean
}

type Props = Pick<RateChangeRequestFragment, 'requestTypeEnumValue'>

const CompleteRateChangeRequestFormFields = ({
  requestTypeEnumValue
}: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const maxDate = useMemo(() => new Date(), [])
  const isConsultation =
    requestTypeEnumValue === RateChangeRequestTypeEnum.CONSULTATION

  return (
    <>
      <Form.NumberInput
        name='outcomeRate'
        label={isConsultation ? 'Recommended Rate' : 'New Hourly Rate'}
        min='0'
        step='any'
        icon={<ReferralBonus16 />}
        width='full'
        hideControls
        required
      />
      {isConsultation && (
        <Form.Checkbox
          label="Set recommended rate to talent's profile."
          name='setRecommendedRateToProfile'
          titleCase={false}
        />
      )}
      <Form.Input
        name='claimerComment'
        label='Comment'
        placeholder='Type a reason...'
        width='full'
        hint="This is for internal usage, it won't be shared with talent."
        autoComplete='off'
        required
      />
      <FormDatePickerWrapper
        name='talentFirstContactedDate'
        label='Talent Contacted at'
        placeholder='Select a date...'
        width='full'
        maxDate={maxDate}
        required
      />
      <Form.Checkbox
        label='I discussed rate with the talent.'
        name='rateNegotiated'
        titleCase={false}
      />
    </>
  )
}

export default CompleteRateChangeRequestFormFields
