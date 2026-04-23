import React from 'react'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal } from '@toptal/picasso/utils'
import { Button } from '@toptal/picasso'

import { ActivityFragment } from '../../data'
import EditActivityModal from '../EditActivityModal'

export interface Props {
  activity: ActivityFragment
  disabled: boolean
}

const EditActivityButton = ({ activity, disabled }: Props) => {
  const { showModal, hideModal, isOpen } = useModal()

  return (
    <>
      <Button
        data-testid='edit-activity-button'
        size='small'
        disabled={disabled}
        onClick={showModal}
      >
        Edit Activity
      </Button>
      {isOpen && (
        <EditActivityModal
          activity={activity}
          onClose={hideModal}
          onEditActivity={hideModal}
        />
      )}
    </>
  )
}

export default EditActivityButton
