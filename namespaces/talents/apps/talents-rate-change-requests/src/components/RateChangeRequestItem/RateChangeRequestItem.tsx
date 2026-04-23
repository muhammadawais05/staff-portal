import React from 'react'
import { Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import { RateChangeRequestFragment } from '../../data/rate-change-request-fragment'
import { RateChangeRequestItemActions, ResourceLink } from '../../components'
import { getRateChangeRequestItem } from './get-rate-change-request-item'

interface RateChangeRequestItemProps {
  rateChangeRequest: RateChangeRequestFragment
  rateRecommendationUnauthorized?: boolean
}

const RateChangeRequestItem = ({
  rateChangeRequest,
  rateRecommendationUnauthorized
}: RateChangeRequestItemProps) => {
  const userDateFormatter = useUserDateFormatter()
  const { talent } = rateChangeRequest
  const talentAvailability = talent
    ? {
        id: talent.id,
        type: talent.type,
        roleTitle: talent.roleTitle,
        allocatedHoursAvailability: talent.allocatedHoursAvailability,
        availableHours: talent.availableHours,
        availableHoursIncludingEndingEngagements:
          talent.availableHoursIncludingEndingEngagements,
        allocatedHours: talent.allocatedHours,
        allocatedHoursAvailabilityIncludingEndingEngagements:
          talent.allocatedHoursAvailabilityIncludingEndingEngagements,
        endingEngagements: {
          nodes: []
        }
      }
    : undefined

  return (
    <Section
      variant='withHeaderBar'
      data-testid='rate-change-request-item'
      title={
        <ResourceLink
          webResource={talent?.webResource}
          text={talent?.fullName}
        />
      }
      actions={
        <RateChangeRequestItemActions
          completeRateChangeRequestOperation={
            rateChangeRequest.operations.completeRateChangeRequest
          }
          talentSlackContacts={rateChangeRequest.talent?.slackContacts}
          {...rateChangeRequest}
        />
      }
    >
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        labelColumnWidth={8}
        defaultValue={NO_VALUE}
        items={getRateChangeRequestItem({
          rateChangeRequest,
          talentAvailability,
          rateRecommendationUnauthorized,
          userDateFormatter
        })}
      />
    </Section>
  )
}

export default RateChangeRequestItem
