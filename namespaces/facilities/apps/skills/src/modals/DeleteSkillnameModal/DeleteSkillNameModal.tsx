import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import { useNotifications } from '@toptal/picasso/utils'
import { PromptModal, Typography } from '@toptal/picasso'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { REFRESH_SKILLS_LIST } from '../../messages'
import { RemoveSkillNameDocument } from './data'

export interface Props {
  skillNameId: string
  hideModal: () => void
}

const DeleteSkillNameModal = ({ skillNameId, hideModal }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()

  const [removeSkillName] = useMutation(RemoveSkillNameDocument, {
    onError: () => {
      showError('An error occurred, the Skill was not deleted.')
    }
  })

  const handleSubmit = async () => {
    const { data } = await removeSkillName({
      variables: { input: { skillNameId } }
    })

    return handleMutationResult({
      mutationResult: data?.removeSkillName,
      successNotificationMessage: 'The Skill was successfully deleted.',
      onSuccessAction: () => emitMessage(REFRESH_SKILLS_LIST)
    })
  }

  return (
    <PromptModal
      open
      onClose={hideModal}
      title='Delete Skill'
      message='Are you sure you want to delete this skill?'
      submitText='Delete Skill'
      variant='negative'
      onSubmit={handleSubmit}
    >
      {() => (
        <Typography size='medium' data-testid='DeleteSkillNameModal-content'>
          This will remove it from all jobs, talents, applicants and portfolio
          items that have it.
        </Typography>
      )}
    </PromptModal>
  )
}

export default DeleteSkillNameModal
