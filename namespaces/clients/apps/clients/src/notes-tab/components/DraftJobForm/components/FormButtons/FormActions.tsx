import React from 'react'
import { Container, Button } from '@toptal/picasso'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { isOperationHidden, Operation } from '@staff-portal/operations'

import { SubmitButton } from '..'
import * as S from './styles'

type Props = {
  isCancelButtonDisabled: boolean
  isSaveDraftJobAndApproveButtonHidden: boolean
  approveClientOperation: OperationType
  onClose: (shouldShowClientApproveModal?: boolean) => void
}

const DraftJobFormActions = ({
  isCancelButtonDisabled,
  isSaveDraftJobAndApproveButtonHidden,
  approveClientOperation,
  onClose
}: Props) => {
  return (
    <Container css={S.container} flex justifyContent='flex-end' top='medium'>
      <Button
        variant='secondary'
        disabled={isCancelButtonDisabled}
        onClick={() => onClose(false)}
      >
        Cancel
      </Button>

      <SubmitButton
        action='saveDraftJob'
        variant={
          isSaveDraftJobAndApproveButtonHidden ||
          isOperationHidden(approveClientOperation)
            ? 'positive'
            : 'secondary'
        }
      >
        Save Draft Job
      </SubmitButton>

      <Operation
        hidden={isSaveDraftJobAndApproveButtonHidden}
        operation={approveClientOperation}
        render={disabled => (
          <SubmitButton
            disabled={disabled}
            action='saveDraftJobAndApprove'
            variant='positive'
          >
            Save Draft Job and Approve
          </SubmitButton>
        )}
      />
    </Container>
  )
}

export default DraftJobFormActions
