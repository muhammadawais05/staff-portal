import React from 'react'
import { NodeType } from '@staff-portal/graphql'
import { PromptModal } from '@staff-portal/modals-service'
import { GetLazyOperationVariables } from '@staff-portal/operations'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { RemoveSalesDraftJobDocument } from '../DraftJobDeleteButton/data'

interface Props {
  draftJobId: string
  hideModal: () => void
}

const DraftJobDeleteModal = ({ draftJobId, hideModal }: Props) => {
  const { handleSubmit, loading: submitting } = useModalFormChangeHandler({
    mutationDocument: RemoveSalesDraftJobDocument,
    errorNotificationMessage: 'An error occurred, Draft Job was not deleted.',
    mutationResultOptions: {
      successNotificationMessage: 'Draft Job has been deleted.'
    }
  })

  const onSubmit = () => handleSubmit({ draftJobId })

  const lazyOperationVariables: GetLazyOperationVariables = {
    nodeId: draftJobId,
    nodeType: NodeType.DRAFT_JOB,
    operationName: 'removeSalesDraftJob'
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      onSubmit={onSubmit}
      loading={submitting}
      operationVariables={lazyOperationVariables}
      title='Delete Draft Job?'
      message='Are you sure that you want to delete the Draft Job?'
      submitText='Delete Job'
      variant='negative'
    />
  )
}

export default DraftJobDeleteModal
