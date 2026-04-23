import { Container, Indicator, Typography } from '@toptal/picasso'
import React from 'react'
import { TaskPriorityLevel } from '@staff-portal/graphql/staff'

import {
  TASK_PRIORITY_COLOR_MAPPING,
  TASK_PRIORITY_OPTIONS,
  TASK_PRIORITY_TEXT_MAPPING
} from '../../config'

const renderPriorityLegend = () =>
  [...TASK_PRIORITY_OPTIONS].reverse().map(({ value: priority }) => {
    const color = TASK_PRIORITY_COLOR_MAPPING[priority as TaskPriorityLevel]
    const label = TASK_PRIORITY_TEXT_MAPPING[priority as TaskPriorityLevel]

    return (
      <Container inline right='small' key={priority}>
        <Container inline right='xsmall'>
          <Indicator color={color} aria-label={label} />
        </Container>
        <Typography size='xsmall' inline>
          {label}
        </Typography>
      </Container>
    )
  })

const PriorityLegend = () => {
  return (
    <Container top='medium' bottom='medium'>
      {renderPriorityLegend()}
    </Container>
  )
}

export default PriorityLegend
