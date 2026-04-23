import React from 'react'
import { Typography, ColorType } from '@toptal/picasso'
import {
  SPECIALIST_ASSIGNMENT_STATUS_MAPPING,
  INACTIVE_SPECIALIST_ASSIGNMENT_STATUS,
  SpecialistAssignmentFragment
} from '@staff-portal/talents-screening-specialists'

import * as S from './styles'
import StatusContentWrapper from './components/StatusContentWrapper'

const SpecialistAssignmentStatus = ({
  specialistAssignment
}: {
  specialistAssignment?: SpecialistAssignmentFragment | null
}) => {
  const { text, color }: { text: string; color: ColorType } =
    specialistAssignment
      ? SPECIALIST_ASSIGNMENT_STATUS_MAPPING[specialistAssignment.status]
      : INACTIVE_SPECIALIST_ASSIGNMENT_STATUS

  return (
    <StatusContentWrapper specialistAssignment={specialistAssignment}>
      <Typography
        inline
        titleCase
        css={S.smallCellWidth}
        weight='semibold'
        color={color}
      >
        {text}
      </Typography>
    </StatusContentWrapper>
  )
}

export default SpecialistAssignmentStatus
