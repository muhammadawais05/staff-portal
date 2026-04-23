import React from 'react'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { WrapWithTooltip, ActionItemProps } from '@staff-portal/ui'
import { isOperationEnabled } from '@staff-portal/operations'
import { ModalActionItem } from '@staff-portal/modals-service'

import AcceptCandidateModal from '../AcceptCandidateModal'

type Props = ActionItemProps & {
  operation: OperationType
  clientHasStaSigned: boolean
  engagementId: string
  'data-testid'?: string
}

const AcceptCandidateItem = ({
  operation,
  clientHasStaSigned,
  engagementId,
  'data-testid': dataTestId = 'accept-candidate-item',
  ...props
}: Props) => {
  const clientDoesNotHaveStaSigned =
    isOperationEnabled(operation) && !clientHasStaSigned

  return (
    <WrapWithTooltip
      enableTooltip={clientDoesNotHaveStaSigned}
      content='STA Must be signed'
    >
      <ModalActionItem
        {...props}
        modal={AcceptCandidateModal}
        modalProps={{ engagementId }}
        operation={operation}
        disabled={clientDoesNotHaveStaSigned}
        data-testid={dataTestId}
      >
        Accept Candidate
      </ModalActionItem>
    </WrapWithTooltip>
  )
}

export default AcceptCandidateItem
