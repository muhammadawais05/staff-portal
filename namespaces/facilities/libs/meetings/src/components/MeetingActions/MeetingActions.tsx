import React from 'react'
import { Container } from '@toptal/picasso'
import { isOperationEnabled } from '@staff-portal/operations'
import { MeetingStatus } from '@staff-portal/graphql/staff'
import { ActionLoader } from '@staff-portal/ui'

import { MeetingFragment } from '../../data/meeting-fragment'
import MeetingCancelButton from './components/MeetingCancelButton'
import MeetingDeleteButton from './components/MeetingDeleteButton'
import MeetingMarkAsCompletedButton from './components/MeetingMarkAsCompletedButton'
import MeetingMarkAsCompletedWithSurveyButton from './components/MeetingMarkAsCompletedWithSurveyButton'
import MeetingMarkAsNotCompletedButton from './components/MeetingMarkAsNotCompletedButton'
import * as S from './styles'

export interface Props {
  meeting?: MeetingFragment | null
  loading?: boolean
}

const MeetingActions = ({ meeting, loading }: Props) => {
  if (!meeting && loading) {
    return <ActionLoader />
  }

  if (!meeting) {
    return null
  }

  const {
    id,
    attendeeName,
    status,
    operations: {
      failMeeting: failMeetingOperation,
      completeMeeting: completeMeetingOperation,
      completeMeetingWithSurvey: completeMeetingWithSurveyOperation,
      cancelMeeting: cancelMeetingOperation,
      removeMeeting: removeMeetingOperation
    }
  } = meeting

  const isMeetingCompleted = status === MeetingStatus.COMPLETED
  const isMeetingNotComplete = status === MeetingStatus.FAILED
  const allowedToCompleteMeetingWithSurvey = isOperationEnabled(
    completeMeetingWithSurveyOperation
  )

  return (
    <Container css={S.buttonContainer}>
      <MeetingDeleteButton
        meetingId={id}
        attendeeName={attendeeName}
        operation={removeMeetingOperation}
      />

      <MeetingCancelButton meetingId={id} operation={cancelMeetingOperation} />

      {allowedToCompleteMeetingWithSurvey && (
        <MeetingMarkAsCompletedWithSurveyButton
          meetingId={id}
          muted={isMeetingNotComplete}
          operation={completeMeetingWithSurveyOperation}
        />
      )}

      {!allowedToCompleteMeetingWithSurvey && (
        <MeetingMarkAsCompletedButton
          meetingId={id}
          muted={isMeetingNotComplete}
          operation={completeMeetingOperation}
        />
      )}

      <MeetingMarkAsNotCompletedButton
        meetingId={id}
        muted={isMeetingCompleted}
        operation={failMeetingOperation}
      />
    </Container>
  )
}

export default MeetingActions
