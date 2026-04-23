import React from 'react'
import { titleize } from '@staff-portal/string'
import { Typography } from '@toptal/picasso'
import { PlaybookTemplatePriority as PriorityType } from '@staff-portal/graphql/staff'
import { PLAYBOOK_TEMPLATE_PRIORITY_COLOR_MAPPING } from '@staff-portal/tasks'

import * as S from './styles'
type Props = {
  priority?: PriorityType | null
}

const PlaybookTemplatePriorityComponent = ({ priority }: Props) => {
  if (!priority) {
    return null
  }

  return (
    <Typography
      css={S.colorStatus(PLAYBOOK_TEMPLATE_PRIORITY_COLOR_MAPPING[priority])}
    >
      {titleize(priority)}
    </Typography>
  )
}

export default PlaybookTemplatePriorityComponent
