import React, { memo } from 'react'
import { Table, TypographyOverflow } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { WidgetErrorBoundary } from '@staff-portal/error-handling'
import { getDateDistanceFromNow } from '@staff-portal/date-time-utils'
import {
  AvailabilityStatus,
  BestMatchField,
  TalentRateField
} from '@staff-portal/talents'

import { AvailabilityRequestItemFragment } from '../../data/get-availability-requests'
import AvailabilityRequestsTalent from '../AvailabilityRequestsTalent'
import AvailabilityRequestsActions from '../AvailabilityRequestsActions'
import AvailabilityRequestsStatus from '../AvailabilityRequestsStatus'
import * as TableStyles from '../AvailabilityRequestsTable/styles'
import * as S from './styles'
import AvailabilityRequestsTableItemContent from '../AvailabilityRequestsTableItemContent'

export interface Props {
  availabilityRequest: NonNullable<AvailabilityRequestItemFragment>
  jobType?: string
  jobId: string
  index: number
  isExpanded: boolean
  expandItem: (availabilityRequestId: string | null) => void
}

const AvailabilityRequestsTableItem = ({
  availabilityRequest,
  jobType,
  jobId,
  index,
  isExpanded,
  expandItem
}: Props) => {
  const {
    status,
    talentJobScoring,
    jobIssues,
    sendCandidateUrl,
    candidateStatus,
    expirationReason,
    talentComment,
    rejectReason,
    talent
  } = availabilityRequest

  const talentCol = (
    <AvailabilityRequestsTalent
      jobIssues={jobIssues}
      talentName={talent?.fullName}
      talentProfileUrl={talent?.webResource?.url}
    />
  )

  const createdCol = availabilityRequest.createdAt && (
    <TypographyOverflow>
      {getDateDistanceFromNow(availabilityRequest.createdAt)}
    </TypographyOverflow>
  )

  const bestMatchCol = talentJobScoring ? (
    <BestMatchField
      bestMatchScoreRank={talentJobScoring.bestMatchScoreRank || 0}
      totalRanked={talentJobScoring.totalTalentRanked || 0}
      bestMatchScore={talentJobScoring.bestMatchScore || 0}
    />
  ) : (
    NO_VALUE
  )

  const ratesCol = (
    <TalentRateField
      clientRates={availabilityRequest.defaultClientRates}
      talentHourlyRate={availabilityRequest.talent?.hourlyRate}
      requestedHourlyRate={availabilityRequest.requestedHourlyRate}
    />
  )

  const availabilityCol = talent && (
    <AvailabilityStatus
      talentAvailability={talent}
      associatedRoles={talent.associatedRoles?.nodes}
      mode='compact'
    />
  )

  const statusCol = (
    <AvailabilityRequestsStatus
      availabilityRequestMetadata={talent?.availabilityRequestMetadata}
      status={status}
      expirationReason={expirationReason}
      talentComment={talentComment}
      rejectReason={rejectReason}
    />
  )

  const actionsCol = (
    <AvailabilityRequestsActions
      availabilityRequestId={availabilityRequest.id}
      sendCandidateUrl={sendCandidateUrl}
      candidateStatus={candidateStatus}
      jobType={jobType}
      talentType={talent?.type}
      talentSuspended={talent?.suspended}
      isExpanded={isExpanded}
      expandItem={expandItem}
    />
  )

  return (
    <Table.ExpandableRow
      data-testid='JobAvailabilityRequest-row'
      content={
        <WidgetErrorBoundary>
          <AvailabilityRequestsTableItemContent
            availabilityRequestId={availabilityRequest.id}
            jobId={jobId}
          />
        </WidgetErrorBoundary>
      }
      css={S.row}
      expanded={isExpanded}
      stripeEven={Boolean(index % 2)}
    >
      <Table.Cell css={TableStyles.talentCol}>{talentCol}</Table.Cell>
      <Table.Cell css={TableStyles.createdCol}>{createdCol}</Table.Cell>
      <Table.Cell css={TableStyles.bestMatchCol}>{bestMatchCol}</Table.Cell>
      <Table.Cell css={TableStyles.ratesCol}>{ratesCol}</Table.Cell>
      <Table.Cell css={TableStyles.availabilityCol}>
        {availabilityCol}
      </Table.Cell>
      <Table.Cell css={TableStyles.statusCol}>{statusCol}</Table.Cell>
      <Table.Cell css={TableStyles.actionsCol}>{actionsCol}</Table.Cell>
    </Table.ExpandableRow>
  )
}

export default memo(AvailabilityRequestsTableItem)
