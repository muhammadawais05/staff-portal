import React from 'react'
import { Container } from '@toptal/picasso'
import { StepMainButton } from '@staff-portal/ui'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { ScreeningStepMenuButton } from '../ScreeningStepMenuButton'
import { getStepData, getIndicatorColor } from '../../utils'
import { useIsStepAssignedToViewer } from '../ScreeningStepButton/use-is-step-assigned-to-viewer'

export interface Props {
  node: ScreeningRoleStepFragment
}

export const ScreeningStepDefaultButton = ({ node }: Props) => {
  const { status, step, mainAction } = node
  const { stepName } = getStepData(step)

  const isStepAssignedToViewer = useIsStepAssignedToViewer(node)
  const indicatorColor = getIndicatorColor(status, isStepAssignedToViewer)

  return (
    <Container flex>
      <StepMainButton.Wrapper>
        <StepMainButton
          tooltip={
            <StepMainButton.TooltipContent
              stepName={stepName}
              messages={mainAction?.tooltip}
            />
          }
          label={stepName}
          indicatorData={{ color: indicatorColor }}
        />
      </StepMainButton.Wrapper>
      <ScreeningStepMenuButton roleStep={node} />
    </Container>
  )
}

export default ScreeningStepDefaultButton
