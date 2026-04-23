import React, { memo } from 'react'
import { Container } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'
import { SendEmailActionItem } from '@staff-portal/communication-send-email'
import { PublicLink } from '@staff-portal/talents'

import WithdrawAvailabilityRequestButton from '../../../WithdrawAvailabilityRequestButton'
import { SlackContact } from '../../../../../SlackButton/types'
import SlackButton from '../../../../../SlackButton/SlackButton'
import { hasSlackContacts } from '../../../../../SlackButton/utils'

interface Props {
  resumeUrl?: string
  isPublicProfileUrl?: boolean
  applicantsEmailMessagingOperation?: OperationType
  withdrawAvailabilityRequestOperation: OperationType
  applicantsEmailMessagingId?: string
  availabilityRequestId: string
  slackContacts: SlackContact[]
}

const AvailabilityRequestItemActions = ({
  resumeUrl,
  isPublicProfileUrl,
  withdrawAvailabilityRequestOperation,
  applicantsEmailMessagingOperation,
  applicantsEmailMessagingId,
  availabilityRequestId,
  slackContacts
}: Props) => {
  return (
    <Container>
      <Container>
        {isPublicProfileUrl ? (
          <PublicLink url={resumeUrl}>Public Profile</PublicLink>
        ) : (
          <PublicLink url={resumeUrl} data-testid='public-resume-button'>
            View Resume
          </PublicLink>
        )}
        {applicantsEmailMessagingOperation &&
          applicantsEmailMessagingId &&
          availabilityRequestId && (
            <SendEmailActionItem
              nodeId={applicantsEmailMessagingId}
              operation={applicantsEmailMessagingOperation}
              operationVariables={{
                nodeId: applicantsEmailMessagingId,
                nodeType: NodeType.EMAIL_MESSAGING_AVAILABILITY_REQUESTEE,
                operationName: 'sendEmailTo'
              }}
              componentType='button'
              variant='secondary'
              size='small'
              data-testid='JobAvailabilityRequest-send-email-button'
            />
          )}
        {hasSlackContacts(slackContacts) && (
          <Container inline left='small'>
            <SlackButton slackContacts={slackContacts} variant='button' />
          </Container>
        )}
        <Container inline left='small'>
          <WithdrawAvailabilityRequestButton
            availabilityRequestId={availabilityRequestId}
            operation={withdrawAvailabilityRequestOperation}
          />
        </Container>
      </Container>
    </Container>
  )
}

export default memo(AvailabilityRequestItemActions)
