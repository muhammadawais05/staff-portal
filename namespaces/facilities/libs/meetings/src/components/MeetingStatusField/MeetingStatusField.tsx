import React from 'react'
import { Container, Tooltip, Typography, QuestionMark16 } from '@toptal/picasso'
import { MeetingStatus } from '@staff-portal/graphql/staff'

import { MeetingFragment } from '../../data/meeting-fragment'
import { OUTCOME_MAPPING, STATUS_MAPPING } from '../../config'

export type Props = Pick<
  MeetingFragment,
  'status' | 'outcome' | 'comment' | 'organizer'
>

const MeetingStatusField = ({
  status,
  outcome,
  comment,
  organizer: { fullName }
}: Props) => {
  const { text, color } = STATUS_MAPPING[status]

  if (status !== MeetingStatus.FAILED || !outcome) {
    return (
      <Typography inline size='medium' weight='semibold' color={color}>
        {text}
      </Typography>
    )
  }

  const outcomeText = OUTCOME_MAPPING[outcome]

  return (
    <Tooltip
      placement='bottom'
      content={
        <>
          <Typography weight='semibold'>
            {`Reason: ${outcomeText}`}
          </Typography>
          <Container top='xsmall'>
            <Typography>
              {`Comment by ${fullName}: ${
                comment || 'No comment was provided'
              }`}
            </Typography>
          </Container>
        </>
      }
    >
      <Typography inline size='medium' weight='semibold' color={color}>
        {text} - {outcomeText} <QuestionMark16 color='dark-grey' />
      </Typography>
    </Tooltip>
  )
}

export default MeetingStatusField
