import { useState } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { REFRESH_SKILLS_LIST } from '../../../../messages'
import { CloneSkillNameDocument } from '../../data/clone-skill-name'
import { CloneSkillNameForm } from '../../types'

export const useModalWithConfirmation = (
  sourceSkillName: string,
  hideModal: () => void
) => {
  const [confirmationRequired, setConfirmationRequired] = useState(false)
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [mutate] = useMutation(CloneSkillNameDocument, {
    onError: () => {
      showError('An error occurred, the Skill was not cloned.')
    }
  })
  const goBack = () => setConfirmationRequired(false)

  const handleSubmit = async (values: CloneSkillNameForm) => {
    const input = { ...values, afterMergeConfirmation: confirmationRequired }
    const { data } = await mutate({ variables: { input } })
    const { cloneSkillName } = data || {}
    const { newName } = values

    if (
      cloneSkillName?.success === false &&
      cloneSkillName.requiresMergeConfirmation === true &&
      cloneSkillName.errors.length === 0
    ) {
      setConfirmationRequired(true)

      return
    }

    const successMessage = cloneSkillName?.requiresMergeConfirmation
      ? `The skill ${sourceSkillName} was successfully cloned and merged into ${newName}.`
      : `The skill ${sourceSkillName} was successfully cloned as ${newName}`

    return handleMutationResult({
      mutationResult: cloneSkillName,
      successNotificationMessage: successMessage,
      onSuccessAction: () => {
        emitMessage(REFRESH_SKILLS_LIST)
        hideModal()
      }
    })
  }

  return { confirmationRequired, goBack, handleSubmit }
}
