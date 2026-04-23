import React from 'react'
import { UpdatePlaybookTemplateInput } from '@staff-portal/graphql/staff'
import { Modal, ModalSuspender } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'
import { lazy } from '@staff-portal/utils'

import { useGetPlaybookTemplate } from './data/get-playbook-template/use-get-playbook-template'

const EditPlaybookTemplateModalContent = lazy(
  () =>
    import(
      './components/EditPlaybookTemplateModalContent/EditPlaybookTemplateModalContent'
    )
)

export const MODAL_TITLE = 'Edit Playbook Template'

export type EditPlaybookTemplateFormType = Omit<
  UpdatePlaybookTemplateInput,
  'clientMutationId' | 'playbookTemplateId'
>

export type Props = {
  hideModal: () => void
  playbookTemplateId: string
}

const EditPlaybookTemplateModal = ({
  hideModal,
  playbookTemplateId
}: Props) => {
  const { data: playbookTemplate, loading } =
    useGetPlaybookTemplate(playbookTemplateId)

  return (
    <Modal
      operationVariables={{
        nodeId: playbookTemplateId,
        nodeType: NodeType.PLAYBOOK_TEMPLATE,
        operationName: 'updatePlaybookTemplate'
      }}
      open
      size='small'
      onClose={hideModal}
      defaultTitle={MODAL_TITLE}
    >
      {loading && <ModalSuspender />}
      {!loading && playbookTemplate && (
        <EditPlaybookTemplateModalContent
          playbookTemplate={playbookTemplate}
          hideModal={hideModal}
        />
      )}
    </Modal>
  )
}

export default EditPlaybookTemplateModal
