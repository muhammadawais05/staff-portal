import React from 'react'
import { Operation, OperationFragment } from '@staff-portal/operations'
import { Button, Link as PicassoLink } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { RateChangeRequestStatus } from '@staff-portal/graphql/staff'

import {
  CompleteRateChangeRequestModal,
  RequestDetailsModal
} from '../../components'
import { RateChangeRequestFragment } from '../../data'

type SlackContacts = Present<
  RateChangeRequestFragment['talent']
>['slackContacts']

type Props = Pick<
  RateChangeRequestFragment,
  | 'id'
  | 'requestTypeEnumValue'
  | 'currentRate'
  | 'desiredRate'
  | 'talentComment'
  | 'status'
  | 'talent'
  | 'engagement'
  | 'createdAt'
  | 'answers'
> & {
  completeRateChangeRequestOperation: OperationFragment
  talentSlackContacts?: SlackContacts
}

const getSlackURL = (slackContacts?: SlackContacts) => {
  const { url } = slackContacts?.nodes[0]?.webResource ?? {}

  return url ?? undefined
}

const RateChangeRequestItemActions = ({
  id,
  requestTypeEnumValue,
  currentRate,
  desiredRate,
  status,
  talentComment,
  completeRateChangeRequestOperation,
  talentSlackContacts,
  talent,
  engagement,
  createdAt,
  answers
}: Props) => {
  const { showModal } = useModal(CompleteRateChangeRequestModal, {
    id,
    requestTypeEnumValue,
    currentRate,
    desiredRate,
    talentComment
  })
  const { showModal: showRequestDetailsModal } = useModal(RequestDetailsModal, {
    currentRate,
    desiredRate,
    talent,
    engagement,
    createdAt,
    answers
  })
  const showContactInSlackButton =
    status === RateChangeRequestStatus.CLAIMED &&
    !!talentSlackContacts?.nodes.length

  const showRequestDetailsButton = Boolean(engagement)

  return (
    <>
      {showRequestDetailsButton && (
        <Button
          variant='secondary'
          size='small'
          onClick={showRequestDetailsModal}
          data-testid='request-details-button'
        >
          Request Details
        </Button>
      )}
      {showContactInSlackButton && (
        <Button
          as={PicassoLink}
          variant='secondary'
          size='small'
          data-testid='contact-in-slack-button'
          href={getSlackURL(talentSlackContacts)}
          target='_blank'
          rel='noreferrer'
        >
          Contact in Slack
        </Button>
      )}
      <Operation
        operation={completeRateChangeRequestOperation}
        render={disabled => (
          <Button
            variant='primary'
            size='small'
            disabled={disabled}
            onClick={showModal}
            data-testid='complete-rate-change-request-button'
          >
            Complete Request...
          </Button>
        )}
      />
    </>
  )
}

export default RateChangeRequestItemActions
