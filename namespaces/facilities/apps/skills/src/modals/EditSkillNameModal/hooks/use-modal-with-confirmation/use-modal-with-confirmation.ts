import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { REFRESH_SKILLS_LIST } from '../../../../messages'
import { EditSkillNameForm } from '../../types'
import { toUpdateSkillNameInput } from '../../utils'
import { UpdateSkillNameDocument } from '../../data'

const useModalWithConfirmation = (
  sourceSkillName: string,
  hideModal: () => void
) => {
  const [confirmationRequired, setConfirmationRequired] = useState(false)
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [mutate] = useMutation(UpdateSkillNameDocument, {
    onError: () => {
      showError('An error occurred, the Skill was not updated.')
    }
  })
  const goBack = () => setConfirmationRequired(false)

  const handleSubmit = async (values: EditSkillNameForm) => {
    const input = toUpdateSkillNameInput(values, confirmationRequired)
    const { data } = await mutate({ variables: { input } })
    const { updateSkillName } = data || {}
    const { newName } = values

    if (
      updateSkillName?.success === false &&
      updateSkillName.requiresMergeConfirmation &&
      updateSkillName.errors.length === 0
    ) {
      setConfirmationRequired(true)
    }

    const successMessage = updateSkillName?.requiresMergeConfirmation
      ? `The skill ${sourceSkillName} was successfully updated and merged into ${newName}.`
      : `The skill ${sourceSkillName} was successfully updated.`

    handleMutationResult({
      mutationResult: updateSkillName,
      successNotificationMessage: successMessage,
      onSuccessAction: () => {
        emitMessage(REFRESH_SKILLS_LIST)
        hideModal()
      }
    })
  }

  return { confirmationRequired, goBack, handleSubmit }
}

export default useModalWithConfirmation
