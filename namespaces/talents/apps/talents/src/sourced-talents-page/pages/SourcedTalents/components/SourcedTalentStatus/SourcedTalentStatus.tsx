import React from 'react'
import { Container, Tooltip, Typography } from '@toptal/picasso'
import { SourcingStatus } from '@staff-portal/graphql/staff'
import { SOURCED_TALENT_STATUS_MAPPING } from '@staff-portal/talents'

import * as S from './styles'
import { SourcedTalentFragment } from '../../data/sourced-talent-fragment.staff.gql.types'

type Props = {
  sourcedTalentStatus?: SourcingStatus | null
  technicalStepsProgress?: SourcedTalentFragment['technicalStepsProgress']
  sourcedTalentName?: string
}

const SourcedTalentStatus = ({
  sourcedTalentStatus,
  sourcedTalentName,
  technicalStepsProgress
}: Props) => {
  if (!sourcedTalentStatus) {
    return null
  }

  const { color, text, tooltip } =
    SOURCED_TALENT_STATUS_MAPPING[sourcedTalentStatus]

  const technicalStepsProgressText =
    SourcingStatus.SCREENING_TECHNICAL === sourcedTalentStatus &&
    technicalStepsProgress
      ? ` (${technicalStepsProgress.currentStep}/${technicalStepsProgress.totalSteps})`
      : ''

  return (
    <Tooltip content={tooltip && tooltip({ name: sourcedTalentName })}>
      <Container as='span'>
        <Typography
          weight='semibold'
          size='medium'
          css={S.colorStatus(color)}
          data-testid='SourcedTalent-status-field'
        >
          {`${text}${technicalStepsProgressText}`}
        </Typography>
      </Container>
    </Tooltip>
  )
}

export default SourcedTalentStatus
