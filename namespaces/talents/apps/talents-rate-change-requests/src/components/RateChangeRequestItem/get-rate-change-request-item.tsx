import React from 'react'
import { Container } from '@toptal/picasso'
import { ColoredStatus, DescriptionFormatter } from '@staff-portal/ui'
import {
  parseAndFormatDate,
  getTimeZoneFullText
} from '@staff-portal/date-time-utils'
import { getRoleTypeText } from '@staff-portal/facilities'
import {
  AvailabilityStatus,
  CollapsibleSkillSetField,
  SpecializationsField,
  StatusField,
  SupplyHealthPriorityField,
  TalentAvailabilityFragment
} from '@staff-portal/talents'

import { RateChangeRequestFragment } from '../../data/rate-change-request-fragment'
import { RateChangeRequestType, RateChangeRequestValue } from '../../components'
import { RATE_CHANGE_REQUEST_STATUS_MAPPING } from '../../constants'
import { getTalentLocation } from '../../utils'
import * as S from './styles'

export const getRateChangeRequestItem =
  ({
    rateChangeRequest,
    talentAvailability,
    rateRecommendationUnauthorized,
    userDateFormatter
  }: {
    rateChangeRequest: RateChangeRequestFragment
    talentAvailability?: TalentAvailabilityFragment
    rateRecommendationUnauthorized?: boolean
    userDateFormatter: <TOutputDate extends string = string>(
      date?: string | null,
      dateFormat?: string
    ) => TOutputDate
  }) =>
  // eslint-disable-next-line complexity
  () => {
    const {
      currentRate,
      desiredRate,
      outcomeRate,
      talent,
      createdAt,
      claimedAt,
      status,
      talentComment,
      claimerComment,
      engagement,
      requestTypeEnumValue
    } = rateChangeRequest

    return [
      [
        {
          label: 'Rate Change Request',
          value: (
            <RateChangeRequestValue
              currentRate={currentRate}
              desiredRate={desiredRate}
              outcomeRate={outcomeRate}
              talent={talent}
              rateRecommendationUnauthorized={rateRecommendationUnauthorized}
            />
          )
        },
        {
          label: 'Request Type',
          value: (
            <RateChangeRequestType
              engagementLink={engagement?.webResource.url}
              requestTypeEnumValue={requestTypeEnumValue}
            />
          )
        }
      ],
      [
        {
          label: 'Status',
          value: status ? (
            <ColoredStatus
              status={RATE_CHANGE_REQUEST_STATUS_MAPPING[status].text}
              color={RATE_CHANGE_REQUEST_STATUS_MAPPING[status].color}
            />
          ) : null
        },
        {
          label: 'Created at',
          value: parseAndFormatDate(createdAt)
        }
      ],
      [
        {
          label: 'Specializations',
          value: talent?.specializationApplications?.nodes?.length ? (
            <SpecializationsField
              specializations={talent.specializationApplications.nodes}
            />
          ) : null
        },
        {
          label: 'Talent Contacted at',
          value: parseAndFormatDate(claimedAt)
        }
      ],
      [
        {
          label: 'Time zone',
          value: talent ? getTimeZoneFullText(talent.timeZone) : null
        },
        {
          label: 'Role',
          value: talent ? getRoleTypeText(talent.type) : null
        }
      ],
      [
        {
          label: 'Location',
          value: getTalentLocation(talent)
        },
        {
          label: 'Availability',
          value: talentAvailability ? (
            <AvailabilityStatus talentAvailability={talentAvailability} />
          ) : null
        }
      ],
      [
        {
          label: 'Supply Priority',
          value: talent?.supplyHealthModelData ? (
            <SupplyHealthPriorityField
              priority={talent.supplyHealthModelData.priority}
              snapshotAt={userDateFormatter(
                talent.supplyHealthModelData.snapshotAt
              )}
            />
          ) : null
        },
        {
          label: 'Membership status',
          value: talent ? (
            <StatusField
              cumulativeStatus={talent?.cumulativeStatus}
              investigations={talent?.investigations}
              newcomer={talent?.newcomer ?? false}
              topShield={talent?.topShield}
            />
          ) : null
        }
      ],
      [
        {
          label: 'Skills',
          value: talent ? (
            <CollapsibleSkillSetField
              talentType={talent.type}
              skills={talent.skillSets?.nodes}
            />
          ) : null
        }
      ],
      [
        {
          label: 'Talent Comment',
          value: talentComment ? (
            <Container css={S.commentParagraph}>
              <DescriptionFormatter text={talentComment} />
            </Container>
          ) : null
        }
      ],
      [
        {
          label: 'Reviewer Comment (internal)',
          value: claimerComment ? (
            <Container css={S.commentParagraph}>
              <DescriptionFormatter text={claimerComment} />
            </Container>
          ) : null
        }
      ]
    ]
  }
