import {
  FeedbackReasonActions,
  FeedbackStatus
} from '@staff-portal/graphql/staff'
import { TypographyOverflow } from '@toptal/picasso'
import React from 'react'
import { DetailedListItems, LinkWrapper } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { useUserDateFormatter } from '@staff-portal/current-user'

import { FeedbackDetailsFragment } from '../../../../data'
import FeedbackDetailsComment from '../../../FeedbackDetailsComment'
import FeedbackDetailsFollowupTask from '../../../FeedbackDetailsFollowupTask'
import FeedbackDetailsReason from '../../../FeedbackDetailsReason'
import { getFeedbackDetailsPeriod } from '../get-feedback-details-period'

export const getFeedbackDetailsContentItems = ({
  feedback: {
    id: feedbackId,
    createdAt,
    comment,
    status,
    task,
    performer,
    targetPeriodSingleDay,
    targetPeriodStartDate,
    targetPeriodEndDate,
    reason: { id: reasonId, action, name: reasonName },
    operations: {
      updateFeedbackComment: updateFeedbackCommentOperation,
      updateFeedbackReason: updateFeedbackReasonOperation
    }
  },
  userDateFormatter
}: {
  feedback: FeedbackDetailsFragment
  userDateFormatter: ReturnType<typeof useUserDateFormatter>
}): DetailedListItems => {
  const performerName = performer?.webResource.text ?? 'System'
  const isPeriodRowHidden = [
    targetPeriodSingleDay,
    targetPeriodStartDate,
    targetPeriodEndDate
  ].every(item => !item)

  const periodRow = [
    {
      label: 'Period',
      value: getFeedbackDetailsPeriod({
        targetPeriodSingleDay,
        targetPeriodStartDate,
        targetPeriodEndDate
      }),
      hidden: isPeriodRowHidden
    }
  ]

  const reasonItem = {
    label: 'Reason',
    value: (
      <FeedbackDetailsReason
        feedbackId={feedbackId}
        reasonId={reasonId}
        reasonLabel={reasonName}
        actionIdentifier={
          action?.identifier.toUpperCase() as FeedbackReasonActions
        }
        feedbackStatus={status}
        disabled={!isOperationEnabled(updateFeedbackReasonOperation)}
      />
    )
  }

  const reasonRow =
    status === FeedbackStatus.ACTIVE
      ? [
          reasonItem,
          {
            label: 'Followup Task',
            value: task && <FeedbackDetailsFollowupTask task={task} />
          }
        ]
      : reasonItem

  return [
    [
      {
        label: 'Performer',
        value: (
          <LinkWrapper
            wrapWhen={Boolean(performer?.webResource?.url)}
            href={performer?.webResource.url as string}
          >
            <TypographyOverflow as='span' weight='inherit' color='inherit'>
              {performerName}
            </TypographyOverflow>
          </LinkWrapper>
        )
      },
      {
        label: action?.shortName || action?.name || '',
        value: userDateFormatter(createdAt)
      }
    ],
    periodRow,
    reasonRow,
    {
      label: 'Comment',
      value: (
        <FeedbackDetailsComment
          feedbackId={feedbackId}
          comment={comment}
          disabled={!isOperationEnabled(updateFeedbackCommentOperation)}
        />
      )
    }
  ]
}
