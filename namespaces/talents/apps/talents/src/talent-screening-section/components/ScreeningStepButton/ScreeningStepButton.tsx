import React from 'react'
import { Container } from '@toptal/picasso'
import { RoleStepMainActions } from '@staff-portal/graphql/staff'
import { StepMainButton } from '@staff-portal/ui'

import { RoleStepNextActionFragment } from '../../data/role-step-next-action-fragment'
import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { ScreeningStepMenuButton } from '../ScreeningStepMenuButton'
import { getStepData, getIndicatorColor } from '../../utils'
import { useIsStepAssignedToViewer } from './use-is-step-assigned-to-viewer'
import { HOOK_MAPPING } from './configs'
import { useRenderLazyMainAction } from '../LazyMainAction'

export interface Props {
  talentId: string
  node: ScreeningRoleStepFragment
  triggerNextAction: (nextActionData: RoleStepNextActionFragment) => void
}

export const ScreeningStepButton = ({
  node,
  triggerNextAction,
  talentId
}: Props) => {
  const {
    status,
    step,
    mainAction,
    id,
    interviewInvitationMissing,
    interviewInvitationScheduled
  } = node
  const { stepName } = getStepData(step)

  const isStepAssignedToViewer = useIsStepAssignedToViewer(node)
  const indicatorColor = getIndicatorColor(status, isStepAssignedToViewer)

  const useMainAction =
    HOOK_MAPPING[mainAction?.actionName as RoleStepMainActions]

  const { showModal } = useMainAction({
    talentId,
    roleStepId: id,
    onSuccess: triggerNextAction
  })

  const renderLazyOperation = useRenderLazyMainAction({
    roleStepId: id,
    initialMainAction: mainAction,
    onSuccess: () => {
      showModal?.()
    }
  })

  return (
    <>
      <Container flex>
        <StepMainButton.Wrapper>
          {renderLazyOperation(({ checkOperation, disabled, loading }) => (
            <StepMainButton
              tooltip={
                <StepMainButton.TooltipContent
                  stepName={stepName}
                  messages={mainAction?.tooltip}
                />
              }
              label={stepName}
              indicatorData={{ color: indicatorColor }}
              showCalendarIcon={Boolean(
                interviewInvitationMissing && !interviewInvitationScheduled
              )}
              showClockIcon={Boolean(interviewInvitationScheduled)}
              loading={loading}
              disabled={disabled}
              onClick={checkOperation}
            />
          ))}
        </StepMainButton.Wrapper>
        <ScreeningStepMenuButton roleStep={node} />
      </Container>
    </>
  )
}

export default ScreeningStepButton
