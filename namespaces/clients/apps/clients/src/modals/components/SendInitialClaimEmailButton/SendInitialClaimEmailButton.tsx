import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import SendInitialClaimEmailModal from '../SendInitialClaimEmailModal/SendInitialClaimEmailModal'

type Props = {
  companyId: string
  operation?: OperationType
}

// TODO: Must be removed after https://toptal-core.atlassian.net/browse/GOLD-2367
const INITIAL_CLAIM_EMAIL_TEMPLATE_ID = 'VjEtRW1haWxUZW1wbGF0ZS05MDQ2OA'

const SendInitialClaimEmailButton = ({ companyId, operation }: Props) => {
  const { showModal } = useModal(SendInitialClaimEmailModal, {
    nodeId: companyId,
    preselectedEmailTemplateId: INITIAL_CLAIM_EMAIL_TEMPLATE_ID
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          data-testid='initial-claim-email-button'
          disabled={disabled}
          variant='secondary'
          size='small'
          onClick={showModal}
        >
          Send Initial Claim Email
        </Button>
      )}
    />
  )
}

export default SendInitialClaimEmailButton
