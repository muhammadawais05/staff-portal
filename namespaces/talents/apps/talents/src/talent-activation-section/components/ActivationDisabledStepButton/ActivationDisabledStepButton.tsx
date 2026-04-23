import React from 'react'
import { Menu, Container } from '@toptal/picasso'
import {
  StepMainButton,
  StepMenuButton,
  StepIndicatorColor
} from '@staff-portal/ui'
import { StepType } from '@staff-portal/graphql/staff'

import { getStepName } from '../../utils'

type Props = {
  type: StepType
}

const indicatorData = { color: StepIndicatorColor.LightGrey }

export const ActivationDisabledStepButton = ({ type }: Props) => {
  const stepName = getStepName(type)

  return (
    <Container flex>
      <StepMainButton.Wrapper>
        <StepMainButton
          label={stepName}
          indicatorData={indicatorData}
          disabled
          tooltip={
            <StepMainButton.TooltipContent
              stepName={stepName}
              messages='These steps are only available after talent has passed the screening process.'
            />
          }
        />
      </StepMainButton.Wrapper>

      <StepMenuButton>
        <Menu />
      </StepMenuButton>
    </Container>
  )
}

export default ActivationDisabledStepButton
