import React, { useMemo } from 'react'
import { DetailedList, LinkWrapper } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { Maybe } from '@staff-portal/graphql/staff'

import isEngagementAvailable from '../../../../utils/is-engagement-available'
import { AvailabilityStepTalentAvailabilityDataFragment } from '../../../../data/get-availability-step-talent-availability-data'

export type Props = {
  jobExpectedWeeklyHoursWithDefault?: Maybe<number>
  talentAvailability: Maybe<
    AvailabilityStepTalentAvailabilityDataFragment['talent']
  >
}

const ConfirmEngagementEndDatesQuestionItem = ({
  jobExpectedWeeklyHoursWithDefault,
  talentAvailability
}: Props) => {
  const { availableHoursIncludingEndingEngagements, endingEngagements } =
    talentAvailability ?? {}

  const endingEngagementsWithClaimers = useMemo(
    () =>
      endingEngagements?.nodes.filter(
        engagement =>
          engagement.webResource?.text &&
          engagement.job?.claimer?.webResource?.text
      ),
    [endingEngagements]
  )
  const endingEngagementsCount = endingEngagementsWithClaimers?.length ?? 0
  const hasEndingEngagements = endingEngagementsCount > 0

  if (!talentAvailability || !hasEndingEngagements) {
    return null
  }

  const isAvailableEngagement = isEngagementAvailable({
    availableHours: availableHoursIncludingEndingEngagements,
    expectedWeeklyHoursWithDefault: jobExpectedWeeklyHoursWithDefault
  })

  if (isAvailableEngagement) {
    return null
  }

  return (
    <DetailedList.Row>
      <DetailedList.Item>
        <Form.Checkbox
          required
          name='engagementEndDatesConfirmed'
          label={
            <>
              {'Did you confirm with '}
              {endingEngagementsWithClaimers?.map((engagement, index) => {
                const isLastEngagement = index === endingEngagementsCount - 1

                return (
                  <React.Fragment key={engagement.id}>
                    <LinkWrapper
                      wrapWhen={Boolean(
                        engagement.job?.claimer?.webResource?.url
                      )}
                      href={engagement.job?.claimer?.webResource?.url as string}
                    >
                      {engagement.job?.claimer?.webResource?.text}
                    </LinkWrapper>
                    {isLastEngagement ? ' ' : ', '}
                  </React.Fragment>
                )
              })}
              {'end date for engagements '}
              {endingEngagementsWithClaimers?.map((engagement, index) => {
                const isLastEngagement = index === endingEngagementsCount - 1

                return (
                  <React.Fragment key={engagement.id}>
                    <LinkWrapper
                      wrapWhen={Boolean(engagement.webResource?.url)}
                      href={engagement.webResource?.url as string}
                    >
                      {engagement.webResource?.text}
                    </LinkWrapper>
                    {!isLastEngagement && ', '}
                  </React.Fragment>
                )
              })}
              ?
            </>
          }
          titleCase={false}
        />
      </DetailedList.Item>
    </DetailedList.Row>
  )
}

export default ConfirmEngagementEndDatesQuestionItem
