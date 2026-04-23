import React from 'react'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { desiredFormatCommitment } from '@staff-portal/jobs'
import { Maybe, WebResource } from '@staff-portal/graphql/staff'
import { AvailabilityStatus } from '@staff-portal/talents'

import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'
import isEngagementAvailable from '../../../../utils/is-engagement-available'

export type Props = {
  jobCommitment?: Maybe<string>
  jobExpectedWeeklyHoursWithDefault?: Maybe<number>
  jobClientWebResource?: Maybe<WebResource['webResource']>
  talentAvailability: Maybe<
    AvailabilityStepTalentAvailabilityDataFragment['talent']
  >
  talentRoleType: string
}

const ConfirmCommitmentQuestionItem = ({
  jobCommitment,
  jobClientWebResource,
  jobExpectedWeeklyHoursWithDefault,
  talentAvailability,
  talentRoleType
}: Props) => {
  if (!talentAvailability) {
    return null
  }

  const isAvailableEngagement = isEngagementAvailable({
    availableHours: talentAvailability.availableHoursIncludingEndingEngagements,
    expectedWeeklyHoursWithDefault: jobExpectedWeeklyHoursWithDefault
  })

  if (isAvailableEngagement) {
    return null
  }

  return (
    <DetailedList.Row>
      <DetailedList.Item
        multilines
        label={
          <>
            {'Did you confirm with '}
            <LinkWrapper
              wrapWhen={Boolean(jobClientWebResource?.url)}
              href={jobClientWebResource?.url as string}
            >
              {jobClientWebResource?.text}
            </LinkWrapper>{' '}
            that {talentRoleType.toLowerCase()} commitment will be less than the
            desired {desiredFormatCommitment(jobCommitment)}?
          </>
        }
      >
        <Form.Checkbox
          required
          name='talentCommitmentConfirmed'
          label={
            <>
              Yes, {talentRoleType.toLowerCase()}'s commitment
              <AvailabilityStatus
                hideAllocatedHours
                hideRoleName
                hideIndicator
                talentAvailability={talentAvailability}
                mode='default'
              />
              has been confirmed for this job.
            </>
          }
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default ConfirmCommitmentQuestionItem
