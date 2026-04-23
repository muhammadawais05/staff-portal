import { Container, Typography } from '@toptal/picasso'
import React from 'react'
import { FeedbackStatus } from '@staff-portal/graphql/staff'
import { DetailedList } from '@staff-portal/ui'
import { useUserDateFormatter } from '@staff-portal/current-user'
import { NO_VALUE } from '@staff-portal/config'

import { FeedbackDetailsFragment } from '../../data'
import MarkOutdatedFeedbackButton from '../MarkOutdatedFeedbackButton'
import { getFeedbackDetailsContentItems } from './utils'

export interface Props {
  feedback: FeedbackDetailsFragment
  labelColumnWidth?: number
  onMarkOutdated: () => void
}

const FeedbackDetails = ({
  feedback,
  labelColumnWidth,
  onMarkOutdated
}: Props) => {
  const {
    id: feedbackId,
    status,
    outdatedComment,
    operations: { markOutdatedFeedback: markOutdatedFeedbackOperation }
  } = feedback
  const userDateFormatter = useUserDateFormatter()

  return (
    <Container data-testid='FeedbackDetails'>
      <Container bottom='small' flex justifyContent='space-between'>
        <Typography variant='heading' size='small'>
          Feedback Details
        </Typography>

        <MarkOutdatedFeedbackButton
          feedbackId={feedbackId}
          operation={markOutdatedFeedbackOperation}
          onCompleted={onMarkOutdated}
        />
      </Container>
      {/* eslint-disable-next-line @toptal/davinci/no-deprecated-props */}
      <DetailedList
        labelColumnWidth={labelColumnWidth}
        defaultValue={NO_VALUE}
        items={getFeedbackDetailsContentItems({ feedback, userDateFormatter })}
      />

      {status === FeedbackStatus.OUTDATED && Boolean(outdatedComment) && (
        <Container top='xsmall' bottom='xsmall' right='small' left='small'>
          <Typography
            weight='semibold'
            size='medium'
            data-testid='FeedbackDetails-outdated-comment'
          >
            Feedback was marked outdated with the following comment:
          </Typography>

          <Typography size='medium'>{outdatedComment}</Typography>
        </Container>
      )}
    </Container>
  )
}

export default FeedbackDetails
