import React from 'react'
import { Button, Container, TypographyOverflow } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { isOperationEnabled } from '@staff-portal/operations'
import { CompanyOperationFragment } from '@staff-portal/clients'

import { CompanyOverviewFragment } from '../../../../data'
import UpdateLegalContactModal from './components/UpdateLegalStatusModal'

export type Props = Pick<
  CompanyOverviewFragment,
  'signerEmail' | 'signerFullName' | 'contact'
> & {
  clientId: string
  operation: CompanyOperationFragment
}

const LegalContact = ({
  clientId,
  contact,
  signerEmail,
  signerFullName,
  operation
}: Props) => {
  const { showModal } = useModal(UpdateLegalContactModal, {
    clientId,
    contact,
    signerEmail,
    signerFullName
  })

  return (
    <Container flex justifyContent='space-between'>
      <TypographyOverflow size='medium'>
        {`${signerFullName} (${signerEmail})`}
      </TypographyOverflow>

      {isOperationEnabled(operation) && (
        <Container left='small'>
          <Button variant='secondary' size='small' onClick={showModal}>
            Edit
          </Button>
        </Container>
      )}
    </Container>
  )
}

export default LegalContact
