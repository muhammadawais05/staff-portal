import React, { memo } from 'react'
import { DescriptionFormatter } from '@staff-portal/ui'

export interface TaskCardLayoutDescriptionFormatterProps {
  description: string
}

const TaskCardLayoutDescriptionFormatter = ({
  description
}: TaskCardLayoutDescriptionFormatterProps) => (
  <DescriptionFormatter text={description} />
)

export default memo(TaskCardLayoutDescriptionFormatter)
