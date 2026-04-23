import {
  getDateDistanceFromNow,
  max,
  parseISO
} from '@staff-portal/date-time-utils'
import { ColorType } from '@toptal/picasso'
import { VariantType } from '@toptal/picasso/TagRectangular/TagRectangular'

import {
  TALENT_AVAILABILITY_STATUS_MAPPING,
  TALENT_AVAILABILITY_COLOR_MAPPING
} from '../services'
import { TalentAvailabilityFragment } from '../data/talent-availability-fragment'

type TalentAvailability = Pick<
  TalentAvailabilityFragment,
  | 'allocatedHoursAvailability'
  | 'availableHours'
  | 'allocatedHours'
  | 'endingEngagements'
>

export const getFutureAvailability = ({
  allocatedHoursAvailability,
  availableHours,
  allocatedHours,
  endingEngagements
}: TalentAvailability) => {
  const engagementEndDates = (endingEngagements?.nodes ?? [])
    .map(engagement => {
      const endDate = engagement.endDate ?? engagement.proposedEnd?.endDate

      return endDate ? parseISO(endDate) : null
    })
    .filter(Boolean) as Date[]

  const futureAvailabilityDistanceToNow =
    engagementEndDates.length > 0
      ? getDateDistanceFromNow(max(engagementEndDates).toISOString(), {
          hideSuffix: true
        })
      : null

  const availabilityStatus = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_STATUS_MAPPING[allocatedHoursAvailability]
    : ''

  const color: ColorType = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_COLOR_MAPPING[allocatedHoursAvailability]
    : 'inherit'

  const variant: VariantType = allocatedHoursAvailability
    ? TALENT_AVAILABILITY_COLOR_MAPPING[allocatedHoursAvailability]
    : 'light-grey'

  return {
    availableHours,
    allocatedHours,
    availabilityStatus,
    futureAvailabilityDistanceToNow,
    variant,
    color
  }
}
