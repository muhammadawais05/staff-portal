import React from 'react'
import { VisualComplianceStatus } from '@staff-portal/graphql/staff'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { Button, Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { assertIsNotNullish } from '@staff-portal/utils'

import { ClientClaimingOperationsFragment } from '../../../../data/client-claiming-operations-fragment'
import LogSalesCallBusinessActions from '../../../LogSalesCallBusinessActions'
import { getLogSalesCallActionDescription } from '../../utils'
import { useGetLogSalesCallActionsData } from '../../data'

type Props = {
  operations?: ClientClaimingOperationsFragment
  clientId: string
  hideModal: () => void
}

const LogSalesCallActionsModalContent = ({
  clientId,
  operations,
  hideModal
}: Props) => {
  const { data, loading } = useGetLogSalesCallActionsData(clientId)

  if (loading) {
    return <ModalSuspender />
  }

  assertIsNotNullish(data)

  const clientName = data.fullName
  const visualComplianceStatus = data.visualComplianceStatus ?? undefined
  const ofacProhibited = !!data.ofacProhibited
  const clientStatus = data.status
  const ofacStatus = data.ofacStatus ?? undefined
  const pausedAt = data.pausedAt ?? undefined

  const ofacCheckNotStarted =
    visualComplianceStatus === VisualComplianceStatus.NOT_FULLY_CHECKED
  const ofacCheckInProgress =
    visualComplianceStatus === VisualComplianceStatus.IN_PROGRESS
  const ofacFullyChecked =
    visualComplianceStatus === VisualComplianceStatus.FULLY_CHECKED
  const ofacStatusSuccess = ofacFullyChecked && !ofacProhibited
  const ofacStatusFailure = ofacFullyChecked && ofacProhibited

  const description = getLogSalesCallActionDescription({
    clientName,
    ofacCheckInProgress,
    ofacCheckNotStarted,
    ofacStatusFailure,
    ofacStatusSuccess
  })

  return (
    <>
      <Modal.Content>
        {description && (
          <Container bottom='medium'>
            <Typography
              size='medium'
              data-testid='log-sales-call-actions-modal-content-description'
            >
              {description}
            </Typography>
          </Container>
        )}

        {operations && (
          <LogSalesCallBusinessActions
            clientPaused={Boolean(pausedAt)}
            clientStatus={clientStatus}
            ofacStatus={ofacStatus}
            ofacStatusSuccess={ofacStatusSuccess}
            ofacCheckNotStarted={ofacCheckNotStarted}
            ofacCheckInProgress={ofacCheckInProgress}
            ofacFullyChecked={ofacFullyChecked}
            operations={operations}
          />
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='remove-call-request-submit'
        >
          {ofacCheckNotStarted ? 'Save' : 'Change Client Status'}
        </Form.SubmitButton>
      </Modal.Actions>
    </>
  )
}

export default LogSalesCallActionsModalContent
