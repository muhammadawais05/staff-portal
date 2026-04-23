import React, { ReactNode } from 'react'
import { OverviewBlock } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'

import { TaskCardLayoutSummaryItemVariant } from '../../../../types'

export interface TaskCardLayoutSummaryItemProps {
  label: string
  value: ReactNode
  variant?: TaskCardLayoutSummaryItemVariant
}

const TaskCardLayoutSummaryItem = ({
  label,
  value,
  variant
}: TaskCardLayoutSummaryItemProps) => {
  return (
    <OverviewBlock
      titleCase
      label={label}
      value={value ?? NO_VALUE}
      variant={variant}
    />
  )
}

export default TaskCardLayoutSummaryItem
