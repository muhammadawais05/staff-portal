import { Tag } from '@toptal/picasso'
import React, { ReactNode } from 'react'
import { WrapWithTooltip } from '@staff-portal/ui'

export interface TaskCardLayoutTagProps {
  children: ReactNode
  tooltip: ReactNode
}

const TaskCardLayoutTag = ({ children, tooltip }: TaskCardLayoutTagProps) => {
  return (
    <WrapWithTooltip enableTooltip={Boolean(tooltip)} content={tooltip}>
      <Tag.Rectangular variant='light-grey'>{children}</Tag.Rectangular>
    </WrapWithTooltip>
  )
}

export default TaskCardLayoutTag
