import React from 'react'
import { Container } from '@toptal/picasso'
import { StepMainButton } from '@staff-portal/ui'
import { isOperationHidden } from '@staff-portal/operations'
import { ActivationStepFragment } from '@staff-portal/talents'

import { useGetStepData } from '../../hooks'
import { getIndicatorData } from './utils/get-indicator-data'
import {
  ClaimActivationStepModalButton,
  ApproveActivationStepModalButton
} from '../../modals'
import { ActivationStepMenuButton } from '../ActivationStepMenuButton'

export interface Props {
  activationId: string
  currentUserId: string
  staffFullName: string
  step: ActivationStepFragment
  talentId: string
  talentFullName: string
  isProfileCreationStepFinished: boolean
  disabled?: boolean
}

export const ActivationStepButton = ({
  activationId,
  step,
  currentUserId,
  staffFullName,
  talentId,
  talentFullName,
  isProfileCreationStepFinished
}: Props) => {
  const {
    stepId,
    stepName,
    isAssignedToViewer,
    isCurrentStep,
    showCalendarIcon,
    needsToptalEmail,
    otherAssignee
  } = useGetStepData(step, { isProfileCreationStepFinished, currentUserId })

  // TODO: https://toptal-core.atlassian.net/browse/PRO-1804
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const { assign, approve } = step.operations!

  return (
    <Container flex>
      <StepMainButton.Wrapper>
        {!isOperationHidden(assign) && (
          <ClaimActivationStepModalButton
            talentId={talentId}
            stepId={stepId}
            stepName={stepName}
            staffId={currentUserId}
            staffFullName={staffFullName}
            talentFullName={talentFullName}
            operation={assign}
            indicatorData={getIndicatorData({
              step,
              operation: assign,
              isAssignedToViewer,
              isCurrentStep
            })}
            showCalendarIcon={showCalendarIcon}
          />
        )}
        {!isOperationHidden(approve) && (
          <ApproveActivationStepModalButton
            talentId={talentId}
            stepId={stepId}
            stepName={stepName}
            operation={approve}
            needsToptalEmail={needsToptalEmail}
            otherAssignee={otherAssignee}
            indicatorData={getIndicatorData({
              step,
              operation: approve,
              isAssignedToViewer,
              isCurrentStep
            })}
            showCalendarIcon={showCalendarIcon}
          />
        )}
      </StepMainButton.Wrapper>
      <ActivationStepMenuButton
        activationId={activationId}
        talentId={talentId}
        step={step}
        stepName={stepName}
      />
    </Container>
  )
}

export default ActivationStepButton
