import { Maybe } from '@toptal/picasso/utils'

import { PossiblyRelatedMeetingsType } from '../types'

export const getFirstMeetingId = (
  possiblyRelatedMeetings?: Maybe<PossiblyRelatedMeetingsType>
) => {
  if (possiblyRelatedMeetings?.totalCount === 1) {
    return possiblyRelatedMeetings?.nodes[0].id
  }
}
