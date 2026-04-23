import React from 'react'
import { Button } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'

import EditPlaybookTemplateModal from '../EditPlaybookTemplateModal'

type Props = {
  playbookTemplateId: string
  operation: OperationType
}

const EditPlaybookTemplateButton = ({
  playbookTemplateId,
  operation
}: Props) => {
  const { showModal } = useModal(EditPlaybookTemplateModal, {
    playbookTemplateId
  })

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <Button
          size='small'
          variant='positive'
          disabled={disabled}
          onClick={showModal}
          data-testid='edit-playbook-template-button'
        >
          Edit
        </Button>
      )}
    />
  )
}

export default EditPlaybookTemplateButton
