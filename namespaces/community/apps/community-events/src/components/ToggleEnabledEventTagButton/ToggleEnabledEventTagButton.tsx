import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { Operation } from '@staff-portal/operations'
import { useNotifications } from '@toptal/picasso/utils'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'

import { EventTag } from '../../types'
import { useUpdateEventTag } from '../../data/update-event-tag/update-event-tag.staff.gql'

interface Props extends Omit<ButtonProps, 'children'> {
  eventTag: EventTag
  children?: ReactNode
}

const ToggleEnabledEventTagButton = ({ eventTag, ...props }: Props) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [updateEventTag, { loading }] = useUpdateEventTag({
    onError() {
      showError(`Unable to ${eventTag.active ? 'disable' : 'enable'} event tag`)
    }
  })

  const handleClick = async () => {
    const { data } = await updateEventTag({
      variables: {
        input: {
          title: eventTag.title as string,
          id: eventTag.id,
          active: !eventTag.active
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateCommunityEventTag,
      successNotificationMessage: `Event tag ${eventTag.title} successfully ${
        eventTag.active ? 'disabled' : 'enabled'
      }`
    })
  }

  return (
    <Operation operation={eventTag.operations.updateCommunityEventTag}>
      <Button
        variant='secondary'
        size='small'
        {...props}
        onClick={handleClick}
        loading={loading}
      >
        {eventTag.active ? 'Disable' : 'Enable'}
      </Button>
    </Operation>
  )
}

export default ToggleEnabledEventTagButton
