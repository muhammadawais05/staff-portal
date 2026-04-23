import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { joinTruthy } from '@staff-portal/utils'

import { CommunityEventFragment } from '../../data/community-event-fragment'
import { CommunityEventContentField } from '../../enums'

export const getCommunityEventContentMapping = ({
  endDate,
  location: { cityName, countryName, stateName },
  shortName,
  startDate
}: CommunityEventFragment) => ({
  [CommunityEventContentField.END_DATE]: {
    label: 'End date',
    value: endDate && parseAndFormatDate(endDate)
  },
  [CommunityEventContentField.LOCATION]: {
    label: 'Location',
    value: joinTruthy([cityName, stateName, countryName])
  },
  [CommunityEventContentField.SHORT_NAME]: {
    label: 'Short name',
    value: shortName
  },
  [CommunityEventContentField.START_DATE]: {
    label: 'Start date',
    value: startDate && parseAndFormatDate(startDate)
  }
})
