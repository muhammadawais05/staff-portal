import { Container, Typography, Exclamation16 } from '@toptal/picasso'
import React from 'react'
import { TalentCumulativeStatus } from '@staff-portal/graphql/staff'
import { ColoredStatus } from '@staff-portal/ui'
import { TaskCardLayout } from '@staff-portal/tasks'
import { getInvestigationTooltip } from '@staff-portal/facilities'
import { TALENT_STATUS_MAPPING } from '@staff-portal/talents'

import { TaskTalentFragment } from '../../../../data/talent-fragment'
import * as S from './styles'

export interface Props {
  talent: TaskTalentFragment
}

const getWorkingStatus = (
  engagements: TaskTalentFragment['engagements']
): string => (engagements.counters.workingNumber ? 'Working' : 'Not Working')

const TalentTaskCardStatus = ({
  talent: { cumulativeStatus, investigations, roleSteps, engagements }
}: Props) => {
  const investigationNodes = investigations?.nodes || []
  const roleStepsNodes = roleSteps?.nodes || []

  const hasAppliedStatus = cumulativeStatus === TalentCumulativeStatus.APPLIED
  const hasInvestigation = investigationNodes.length > 0

  const { text, color } = TALENT_STATUS_MAPPING[cumulativeStatus]
  const tooltipContent = hasInvestigation
    ? getInvestigationTooltip(investigationNodes[0].startedAt)
    : undefined
  const tooltipIcon = <Exclamation16 color='dark-grey' />

  return (
    <TaskCardLayout.SummaryItem
      label='Status'
      value={
        <Container
          inline
          flex
          direction='row'
          alignItems='baseline'
          css={S.statusContainer}
        >
          <Container as='span' right='xsmall'>
            <ColoredStatus
              status={text}
              color={color}
              tooltipContent={tooltipContent}
              tooltipIcon={tooltipIcon}
            />
          </Container>

          <Typography
            size='xsmall'
            as='span'
            weight={!hasAppliedStatus ? 'semibold' : undefined}
          >
            {hasAppliedStatus
              ? roleStepsNodes[0]?.step.title
              : getWorkingStatus(engagements)}
          </Typography>
        </Container>
      }
    />
  )
}

export default TalentTaskCardStatus
