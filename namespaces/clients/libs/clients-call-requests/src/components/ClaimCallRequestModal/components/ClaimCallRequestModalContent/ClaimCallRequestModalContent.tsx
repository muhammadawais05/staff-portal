import React from 'react'
import { Container, Typography, Button } from '@toptal/picasso'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Maybe } from '@staff-portal/graphql/staff'

import { CallRequestType } from '../../../../enums'
import { ClaimCallbackRequestWithClientMutationVariables } from '../../data/claim-call-request-with-client'
import { GetClaimCallRequestFragment } from '../../data/get-claim-call-request'
import { getClientNameWithFallback } from '../../utils/get-client-name-with-fallback'
import OverlappingMeetingsText from '../../../OverlappingMeetingsText'
import RequestedTimeText from '../RequestedTimeText'
import OutsideWorkingHoursText from '../../../OutsideWorkingHoursText'
import ClientClaimText from '../ClientClaimText'
import ClaimCallRequestModalIcon from '../../../ClaimCallRequestModalIcon'

export interface Props {
  isClientClaimed: boolean
  loading?: boolean
  hideModal: () => void
  onClaimCallRequest: (options?: {
    variables: ClaimCallbackRequestWithClientMutationVariables
  }) => void
  callRequest?: Maybe<GetClaimCallRequestFragment>
}

const ClaimCallRequestModalContent = ({
  loading,
  hideModal,
  isClientClaimed,
  onClaimCallRequest,
  callRequest
}: Props) => {
  if (loading && !callRequest) {
    return <ModalSuspender />
  }

  if (!callRequest) {
    return null
  }

  const {
    id,
    requestedStartTime,
    name,
    type,
    inWorkingHours,
    overlappingMeetings
  } = callRequest

  const clientName = getClientNameWithFallback(callRequest?.name)

  const modalTitle = `Claim ${
    type === CallRequestType.SCHEDULED ? 'a Scheduled' : 'an Instant'
  } Call Request from ${clientName}`

  const submitText = isClientClaimed ? 'Claim Call' : 'Claim Company and Call'

  return (
    <>
      <Modal.Title data-testid='claim-call-request-modal-header'>
        {modalTitle}
      </Modal.Title>

      <Modal.Content>
        <Container flex alignItems='center' justifyContent='space-between'>
          <Container>
            <RequestedTimeText
              name={name}
              type={type}
              requestedStartTime={requestedStartTime}
            />
            <OverlappingMeetingsText
              type={type}
              meetings={overlappingMeetings?.nodes || []}
            />
            <OutsideWorkingHoursText
              type={type}
              inWorkingHours={!!inWorkingHours}
            />
            <Typography size='medium'>
              Would you like to claim this call?
            </Typography>
            <ClientClaimText isClaimed={isClientClaimed} />
          </Container>
          <ClaimCallRequestModalIcon type={type} />
        </Container>
      </Modal.Content>

      <Modal.Actions>
        <Button disabled={loading} variant='secondary' onClick={hideModal}>
          Cancel
        </Button>
        <Button
          loading={loading}
          onClick={() => {
            const variables = {
              variables: { input: { callbackRequestId: String(id) } }
            }

            onClaimCallRequest(variables)
          }}
          data-testid='claim-call-request-submit'
          variant='positive'
        >
          {submitText}
        </Button>
      </Modal.Actions>
    </>
  )
}

export default ClaimCallRequestModalContent
