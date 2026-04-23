import React from 'react'
import { ColoredStatus, DescriptionFormatter } from '@staff-portal/ui'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'

import {
  RateChangeRequestValue,
  RateChangeRequestType
} from '../../../components'
import { RATE_CHANGE_REQUEST_STATUS_MAPPING } from '../../../constants'
import { RateChangeRequestFragment } from '../../../data'
import { RateChangeRequestContentField } from '../../enums'

export const getRateChangeRequestMapping = ({
  currentRate,
  desiredRate,
  outcomeRate,
  requestTypeEnumValue,
  status,
  createdAt,
  claimedAt,
  talent,
  talentComment,
  claimerComment,
  engagement
}: RateChangeRequestFragment) => ({
  [RateChangeRequestContentField.RATE_CHANGE_REQUEST]: {
    label: 'Rate Change Request',
    value: (
      <RateChangeRequestValue
        currentRate={currentRate}
        desiredRate={desiredRate}
        outcomeRate={outcomeRate}
        talent={talent}
        rateRecommendationUnauthorized
      />
    )
  },
  [RateChangeRequestContentField.REQUEST_TYPE]: {
    label: 'Request Type',
    value: (
      <RateChangeRequestType
        engagementLink={engagement?.webResource.url}
        requestTypeEnumValue={requestTypeEnumValue}
      />
    )
  },
  [RateChangeRequestContentField.STATUS]: {
    label: 'Status',
    value: status ? (
      <ColoredStatus
        status={RATE_CHANGE_REQUEST_STATUS_MAPPING[status].text}
        color={RATE_CHANGE_REQUEST_STATUS_MAPPING[status].color}
      />
    ) : null
  },
  [RateChangeRequestContentField.CREATED_AT]: {
    label: 'Created at',
    value: parseAndFormatDate(createdAt)
  },
  [RateChangeRequestContentField.TALENT_CONTACTED_AT]: {
    label: 'Talent Contacted at',
    value: parseAndFormatDate(claimedAt)
  },
  [RateChangeRequestContentField.TALENT_COMMENT]: {
    label: 'Talent Comment',
    value: talentComment ? <DescriptionFormatter text={talentComment} /> : null
  },
  [RateChangeRequestContentField.MATCHER_COMMENT]: {
    label: 'Reviewer Comment (internal)',
    value: claimerComment ? (
      <DescriptionFormatter text={claimerComment} />
    ) : null
  }
})
