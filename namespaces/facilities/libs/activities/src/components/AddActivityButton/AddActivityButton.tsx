import React from 'react'
import { useModal } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { ActivityType } from '@staff-portal/graphql/staff'

import AddActivityModal from '../AddActivityModal'

type Props = {
  subjectId: string
  type?: ActivityType
  disabled?: boolean
}

const AddActivityButton = ({ subjectId, disabled, type }: Props) => {
  const { showModal } = useModal(AddActivityModal, { subjectId, type })

  return (
    <Button
      size='small'
      variant='secondary'
      disabled={disabled}
      onClick={showModal}
      data-testid='add-activity-button'
    >
      Add Activity
    </Button>
  )
}

export default AddActivityButton
