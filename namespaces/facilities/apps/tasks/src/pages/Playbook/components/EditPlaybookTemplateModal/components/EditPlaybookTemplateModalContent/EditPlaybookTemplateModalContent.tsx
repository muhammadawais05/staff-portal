import React, { useCallback } from 'react'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { PLAYBOOK_TEMPLATE_UPDATED } from '../../../../messages'
import { UpdatePlaybookTemplateDocument } from '../../data/update-playbook-template/update-playbook-template.staff.gql.types'
import { PlaybookTemplateEditFragment } from '../../data/get-playbook-template/get-playbook-template.staff.gql.types'
import { useGetFormInitialValues } from '../../utils'
import EditPlaybookTemplateForm from '../EditPlaybookTemplateForm'
import {
  MODAL_TITLE,
  EditPlaybookTemplateFormType
} from '../../EditPlaybookTemplateModal'

export const ERROR_MESSAGE =
  'An error occurred, the Playbook template was not updated.'
export const SUCCESS_MESSAGE = 'The Playbook template was successfully updated.'

type Props = {
  hideModal: () => void
  playbookTemplate: PlaybookTemplateEditFragment
}

const EditPlaybookTemplateModalContent = ({
  hideModal,
  playbookTemplate
}: Props) => {
  const initialValues = useGetFormInitialValues(playbookTemplate)

  const { handleSubmit: handleMutationSubmit, loading } =
    useModalFormChangeHandler({
      mutationDocument: UpdatePlaybookTemplateDocument,
      errorNotificationMessage: ERROR_MESSAGE,
      mutationResultOptions: {
        isFormSubmit: true,
        successNotificationMessage: SUCCESS_MESSAGE,
        successMessageEmitOptions: {
          type: PLAYBOOK_TEMPLATE_UPDATED,
          payload: { playbookTemplateId: playbookTemplate.id }
        },
        onSuccessAction: hideModal
      }
    })

  const handleSubmit = useCallback(
    ({
      dueDateRuleAmount,
      recurring,
      ...formValues
    }: EditPlaybookTemplateFormType) =>
      handleMutationSubmit({
        playbookTemplateId: playbookTemplate.id,
        dueDateRuleAmount: dueDateRuleAmount && Number(dueDateRuleAmount),
        recurring: recurring && Number(recurring),
        ...formValues
      }),
    [handleMutationSubmit, playbookTemplate.id]
  )

  return (
    <ModalForm<EditPlaybookTemplateFormType>
      onSubmit={handleSubmit}
      initialValues={initialValues}
      title={MODAL_TITLE}
    >
      <EditPlaybookTemplateForm loading={loading} hideModal={hideModal} />
    </ModalForm>
  )
}

export default EditPlaybookTemplateModalContent
