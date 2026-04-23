import React from 'react'
import { Button, Container } from '@toptal/picasso'
import { OperationFragment, Operation } from '@staff-portal/operations'
import { useModal } from '@staff-portal/modals-service'

import { DefaultContactFragment } from '../../data/default-contact-fragment'
import SendSTAModal from '../SendSTAModal/SendSTAModal'

export type Props = {
  clientId: string
  operation: OperationFragment
  defaultContact: DefaultContactFragment
  isSubsidiarySelected: boolean
}

const SendSTAButton = ({
  clientId,
  operation,
  defaultContact,
  isSubsidiarySelected
}: Props) => {
  const { showModal } = useModal(SendSTAModal, {
    clientId,
    defaultContact,
    isSubsidiarySelected
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Container left='small'>
          <Button size='small' disabled={disabled} onClick={showModal}>
            Send STA
          </Button>
        </Container>
      )}
    ></Operation>
  )
}

export default SendSTAButton
