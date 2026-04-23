import React from 'react'
import { TagSelector } from '@toptal/picasso'
import { LinkWrapper } from '@staff-portal/ui'
import { RoleOrClientFragment } from '@staff-portal/facilities'

export interface Props {
  performerId: string
  watcher: RoleOrClientFragment
  displayValue: string
  onDelete: () => void
  disabled?: boolean
}

const TaskWatcherLabel = ({
  performerId,
  watcher: {
    id,
    webResource: { url }
  },
  displayValue,
  disabled,
  onDelete
}: Props) => {
  return (
    <TagSelector.Label
      disabled={disabled}
      onDelete={performerId === id ? undefined : onDelete}
    >
      <LinkWrapper wrapWhen={Boolean(url)} href={url as string} target='_blank'>
        {displayValue}
      </LinkWrapper>
    </TagSelector.Label>
  )
}

export default TaskWatcherLabel
