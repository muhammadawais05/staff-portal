import React, { ReactNode } from 'react'
import { Button, ButtonProps } from '@toptal/picasso'
import { useModal } from '@staff-portal/modals-service'
import { Operation } from '@staff-portal/operations'

import UpdateEventTagModal from '../UpdateEventTagModal/UpdateEventTagModal'
import { EventTag } from '../../types'

interface Props extends Omit<ButtonProps, 'children'> {
  eventTag: EventTag
  children?: ReactNode
}

const UpdateEventTagButton = ({ eventTag, children, ...props }: Props) => {
  const { showModal } = useModal(UpdateEventTagModal, {
    eventTag
  })

  return (
    <Operation operation={eventTag.operations.updateCommunityEventTag}>
      <Button variant='secondary' size='small' {...props} onClick={showModal}>
        {children ?? 'Update'}
      </Button>
    </Operation>
  )
}

export default UpdateEventTagButton
