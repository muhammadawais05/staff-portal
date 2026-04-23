import React, { ReactNode } from 'react'
import { Button, ButtonProps, PromptModal } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { useRemoveEventTag } from '../../data/remove-event-tag/remove-event-tag.staff.gql'
import { EventTag } from '../../types'

interface Props extends Omit<ButtonProps, 'children'> {
  eventTag: EventTag
  children?: ReactNode
}

const RemoveEventTagButton = ({ eventTag, children, ...props }: Props) => {
  const { isOpen, showModal, hideModal } = useModal()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const [removeEventTag] = useRemoveEventTag({
    onError() {
      showError(`Unable to remove event tag ${eventTag.title}`)
    }
  })

  const handleConfirm = async () => {
    const { data } = await removeEventTag({
      variables: { input: { id: eventTag.id } }
    })

    return handleMutationResult({
      mutationResult: data?.removeCommunityEventTag,
      successNotificationMessage: `Event tag ${eventTag.title} successfully removed`,
      onSuccessAction() {
        hideModal()
      }
    })
  }

  return (
    <Operation operation={eventTag.operations.removeCommunityEventTag}>
      <Button size='small' variant='secondary' {...props} onClick={showModal}>
        {children ?? 'Remove'}
      </Button>

      <PromptModal
        open={isOpen}
        title='Remove event tag'
        message={`Are you sure you want to remove event tag ${eventTag.title}?`}
        onSubmit={handleConfirm}
        onBackdropClick={hideModal}
        onCancel={hideModal}
      />
    </Operation>
  )
}

export default RemoveEventTagButton
