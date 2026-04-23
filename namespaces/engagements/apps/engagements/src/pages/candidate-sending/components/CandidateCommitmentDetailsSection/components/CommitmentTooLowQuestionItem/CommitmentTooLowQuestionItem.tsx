import React from 'react'
import { DetailedList } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { EngagementCommitmentEnum, Maybe } from '@staff-portal/graphql/staff'

import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'
import { getQuestionText } from './utils'

export type Props = {
  availabilityData: AvailabilityStepTalentAvailabilityDataFragment
  commitment: EngagementCommitmentEnum | null | undefined
  commitmentTooLow?: Maybe<boolean>
}

const CommitmentTooLowQuestionItem = ({
  availabilityData,
  commitment,
  commitmentTooLow
}: Props) => {
  if (!commitmentTooLow) {
    return null
  }

  const questionText = getQuestionText({
    commitment,
    jobCommitment: availabilityData.job?.commitment,
    jobExpectedWeeklyHours: availabilityData.job?.expectedWeeklyHours
  })

  return (
    <DetailedList.Row>
      <DetailedList.Item multilines label={<>{questionText}</>}>
        <Form.Checkbox
          required
          name='acceptLowerCommitment'
          label="I've verified with my pod lead that I can override and send this talent."
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default CommitmentTooLowQuestionItem
