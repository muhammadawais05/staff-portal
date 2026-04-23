import React, { useState } from 'react'
import { Section } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import {
  DetailedList as DL,
  SectionWithDetailedListSkeleton
} from '@staff-portal/ui'
import { useHistoryPolling } from '@staff-portal/chronicles'
import {
  EngagementStatus,
  INTERVIEW_UPDATED,
  INTERVIEW_SCHEDULED
} from '@staff-portal/engagements-interviews'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import { useGetEngagementStatus } from './data'
import EngagementStatusDetails from '../EngagementStatusDetails'
import EngagementEstimatedEndDate from '../EngagementEstimatedEndDate'
import EngagementEstimatedEndDateHistory, {
  HISTORY_POLL_DURATION,
  HISTORY_POLL_INTERVAL
} from '../EngagementEstimatedEndDateHistory'

interface Props {
  engagementId: string
  labelColumnWidth?: number
}

const EngagementStatusSection = ({ engagementId, labelColumnWidth }: Props) => {
  const { data, loading, refetch } = useGetEngagementStatus(engagementId)
  const [
    isEstimatedEndDateHistoryVisible,
    setEstimatedEndDateHistoryVisibility
  ] = useState(false)
  const [
    estimatedEndDateHistoryPollInterval,
    startEstimatedEndDateHistoryPooling
  ] = useHistoryPolling(HISTORY_POLL_INTERVAL, HISTORY_POLL_DURATION)

  useMessageListener(
    [ENGAGEMENT_UPDATED, INTERVIEW_UPDATED, INTERVIEW_SCHEDULED],
    ({ engagementId: id }) => id === engagementId && refetch()
  )

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Status'
        labelColumnWidth={labelColumnWidth}
        columns={1}
        items={2}
      />
    )
  }

  if (!data?.status) {
    return null
  }

  const { talent, cumulativeStatus, status } = data

  return (
    <Section
      variant='withHeaderBar'
      title='Status'
      data-testid='engagement-status-section'
    >
      <DL labelColumnWidth={labelColumnWidth}>
        <DL.Row>
          <DL.Item label='Status'>
            <EngagementStatus.Default
              engagement={data}
              talentType={talent?.type}
            />
          </DL.Item>
        </DL.Row>

        <DL.Row>
          <DL.Item label='Estimated End Date'>
            <EngagementEstimatedEndDate
              engagementId={data.id}
              date={data.proposedEnd?.endDate}
              operation={data.operations.proposeEngagementEnd}
              isHistoryVisible={isEstimatedEndDateHistoryVisible}
              setHistoryVisibility={setEstimatedEndDateHistoryVisibility}
              onChange={startEstimatedEndDateHistoryPooling}
            />
          </DL.Item>
        </DL.Row>

        {isEstimatedEndDateHistoryVisible && (
          <DL.Row>
            <DL.Item
              label={
                <EngagementEstimatedEndDateHistory
                  engagementId={data.id}
                  pollInterval={estimatedEndDateHistoryPollInterval}
                />
              }
              isFullWidthLabel
            />
          </DL.Row>
        )}

        {!cumulativeStatus?.startsWith('interview_') && (
          <DL.Row>
            <DL.Item label='Status Details'>
              <EngagementStatusDetails engagement={{ ...data, status }} />
            </DL.Item>
          </DL.Row>
        )}
      </DL>
    </Section>
  )
}

export default EngagementStatusSection
