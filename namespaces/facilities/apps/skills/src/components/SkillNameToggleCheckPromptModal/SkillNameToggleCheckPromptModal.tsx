import React from 'react'
import { PromptModal } from '@staff-portal/modals-service'
import { Typography } from '@toptal/picasso'
import { capitalize } from '@toptal/picasso/utils'

import { SkillNameCheckType } from '../index'

type Props = {
  type: SkillNameCheckType
  name: string
  loading?: boolean
  hideModal: () => void
  onSubmit: () => void
}

const SkillNameToggleCheckPromptModal = ({
  type,
  name,
  loading,
  hideModal,
  onSubmit
}: Props) => {
  const handleSubmit = () => {
    hideModal()
    onSubmit()
  }

  return (
    <PromptModal
      open
      loading={loading}
      title='Confirm'
      message={
        <Typography size='medium'>
          {`Switching this toggle is going to instantly change ${capitalize(
            type
          )} checked setting for `}
          <Typography as='strong' weight='semibold'>
            {name}
          </Typography>
          . Do you want to continue?
        </Typography>
      }
      submitText='OK'
      onSubmit={handleSubmit}
      onClose={hideModal}
    />
  )
}

export default SkillNameToggleCheckPromptModal
