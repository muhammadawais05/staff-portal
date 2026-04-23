import React from 'react'
import { Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import useClientApproveModal from '../../../notes-tab/components/ClientApproveModal/hooks/use-client-approve-modal'

type Props = {
  companyId: string
  operation?: OperationType
}

const ApproveCompanyButton = ({ companyId, operation }: Props) => {
  const { showModal: showClientApproveModal } = useClientApproveModal({
    clientId: companyId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          disabled={disabled}
          variant='secondary'
          size='small'
          onClick={showClientApproveModal}
        >
          Approve Company
        </Button>
      )}
    />
  )
}

export default ApproveCompanyButton
