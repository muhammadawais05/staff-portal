import React from 'react'
import { Link } from '@staff-portal/navigation'
import { DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE } from '@staff-portal/date-time-utils'
import { useUserDateTimeFormatter } from '@staff-portal/current-user'

import { EngagementInterviewFragment } from '../../data/get-engagement-interviews'
import InterviewContentItem from '../InterviewContentItem'
import getMeetingDurations from './utils/get-meeting-durations'

export interface Props {
  interview: Pick<
    EngagementInterviewFragment,
    'webConferenceInfo' | 'occurred' | 'bluejeansMeetingHistory'
  >
}

const InterviewContent = ({ interview }: Props) => {
  const formatDateTime = useUserDateTimeFormatter()

  const { webConferenceInfo, bluejeansMeetingHistory, occurred } = interview

  if (!webConferenceInfo?.url) {
    return null
  }

  return (
    <>
      <InterviewContentItem
        top='small'
        label='Web Conference URL:'
        value={
          <Link href={webConferenceInfo.url} target='_blank'>
            {webConferenceInfo.url}
          </Link>
        }
      />
      {occurred && bluejeansMeetingHistory && (
        <>
          <InterviewContentItem
            top='small'
            label='Actual Start Time:'
            value={formatDateTime(
              bluejeansMeetingHistory.startTime,
              DEFAULT_FULL_DATE_FORMAT_WITH_TIMEZONE
            )}
          />
          <InterviewContentItem
            top='small'
            label='Duration:'
            value={getMeetingDurations(
              bluejeansMeetingHistory.durationInSeconds
            )}
          />
        </>
      )}
    </>
  )
}

export default InterviewContent
