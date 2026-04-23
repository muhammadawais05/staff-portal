import { Option } from '@toptal/picasso/Select/types'
import { Maybe } from '@toptal/picasso/utils'
import { getFormattedDate } from '@staff-portal/date-time-utils'

import { PossiblyRelatedMeetingsType } from '../types'

export const getMatchingCallsOptions = (
  possiblyRelatedMeetings?: Maybe<PossiblyRelatedMeetingsType>
) => {
  const totalCount = possiblyRelatedMeetings?.totalCount || 0

  if (totalCount < 2) {
    return undefined
  }

  return possiblyRelatedMeetings?.nodes.map<Option<string>>(currentValue => ({
    text: `${getFormattedDate(currentValue.scheduledAt)} at ${getFormattedDate(
      currentValue.scheduledAt,
      'time'
    )}, ${currentValue.organizer.fullName}`,
    value: currentValue.id
  }))
}
