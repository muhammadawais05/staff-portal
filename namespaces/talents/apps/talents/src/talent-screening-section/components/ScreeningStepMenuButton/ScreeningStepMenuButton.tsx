import React from 'react'
import { Container, Menu, Typography } from '@toptal/picasso'
import { RoleStepAdditionalActionName } from '@staff-portal/graphql/staff'
import { StepMenuButton } from '@staff-portal/ui'
import { useSendEmailModal } from '@staff-portal/communication-send-email'
import { useSendRescheduleScreeningEmailModal } from '@staff-portal/talents'
import { Operation } from '@staff-portal/operations'

import { getAdditionalActions } from './utils'
import { useUnclaimScreeningStepModal } from '../UnclaimScreeningStepModal'
import { useReassignScreeningStepModal } from '../ReassignScreeningStepModal'
import { useResetScreeningStepModal } from '../ResetScreeningStepModal'
import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { useSendIntroduceBookingEmailModal } from '../../modals/SendIntroduceScreeningEmailModal/services/use-send-introduce-booking-email-modal/use-send-introduce-booking-email-modal'
import { useSendRestoreBookingEmailModal } from '../../modals/SendRestoreScreeningEmailModal/services/use-send-restore-booking-email-modal/use-send-restore-booking-email-modal'
import { useCancelScheduledInvitationModal } from '../CancelScheduledInvitationModal'

interface Props {
  roleStep: ScreeningRoleStepFragment
}

const RESET_STEP = 'Reset Step'
const TECHNICAL_TWO_STEP = 'technical_two'

const ScreeningStepMenuButton = ({ roleStep }: Props) => {
  const { showModal: showSendEmailModal } = useSendEmailModal()

  const unclaimButtonText =
    roleStep.status === 'approved' ? RESET_STEP : 'Unclaim Step'

  const { showModal: showUnclaimScreeningStepModal } =
    useUnclaimScreeningStepModal({
      roleStep
    })

  const { showModal: showReassignScreeningStepModal } =
    useReassignScreeningStepModal({
      roleStep
    })

  const { showModal: showResetScreeningStepModal } = useResetScreeningStepModal(
    {
      roleStep
    }
  )

  const { showModal: showRestoreBookingModal } =
    useSendRestoreBookingEmailModal({ talentId: roleStep.talent.id })

  const { showModal: showIntroduceBookingModal } =
    useSendIntroduceBookingEmailModal({
      talentId: roleStep.talent.id,
      scheduledSend: roleStep.step.stepType === TECHNICAL_TWO_STEP
    })

  const { showModal: showRescheduleBookingModal } =
    useSendRescheduleScreeningEmailModal()

  const { showModal: showCancelScheduledInvitationModal } =
    useCancelScheduledInvitationModal({
      roleStepId: roleStep.id,
      talentId: roleStep.talent.id
    })

  if (!roleStep.additionalActions?.nodes?.length) {
    return (
      <StepMenuButton>
        <Container padded='xsmall'>
          <Typography size='medium'>No additional actions</Typography>
        </Container>
      </StepMenuButton>
    )
  }

  const actions = getAdditionalActions(roleStep)

  return (
    <>
      <StepMenuButton>
        <Menu>
          <Operation
            operation={roleStep.operations.reassignRoleStep}
            render={disabled => (
              <Menu.Item
                disabled={disabled}
                onClick={showReassignScreeningStepModal}
              >
                Reassign Step
              </Menu.Item>
            )}
          />

          <Operation
            operation={roleStep.operations.unclaimRoleStep}
            render={disabled => (
              <Menu.Item
                disabled={disabled}
                onClick={showUnclaimScreeningStepModal}
              >
                {unclaimButtonText}
              </Menu.Item>
            )}
          />

          <Operation
            operation={roleStep.operations.unapproveRoleStep}
            render={disabled => (
              <Menu.Item
                disabled={disabled}
                onClick={showResetScreeningStepModal}
              >
                {RESET_STEP}
              </Menu.Item>
            )}
          />

          {actions?.map(({ actionText, actionName, emailTemplate }) => (
            <Menu.Item
              key={actionText}
              onClick={() => {
                switch (actionName) {
                  case RoleStepAdditionalActionName.SEND_EMAIL_TO:
                    if (emailTemplate) {
                      showSendEmailModal({
                        nodeId: roleStep.id,
                        preselectedEmailTemplateId: emailTemplate.id
                      })
                    }
                    break
                  case RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING:
                    showRestoreBookingModal()
                    break
                  case RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING:
                    showIntroduceBookingModal()
                    break
                  case RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING:
                    showRescheduleBookingModal({ talentId: roleStep.talent.id })
                    break
                  case RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION:
                    showCancelScheduledInvitationModal()
                    break
                }
              }}
            >
              {actionText}
            </Menu.Item>
          ))}
        </Menu>
      </StepMenuButton>
    </>
  )
}

export default ScreeningStepMenuButton
