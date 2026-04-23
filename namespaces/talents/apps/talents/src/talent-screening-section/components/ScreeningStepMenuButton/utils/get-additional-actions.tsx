import { RoleStepAdditionalActionName } from '@staff-portal/graphql/staff'

import { ScreeningRoleStepFragment } from '../../../data/get-talent-screening-role-steps'

type EmailActionWithoutEmailTemplate =
  | typeof RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING
  | typeof RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING
  | typeof RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING
  | typeof RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION

const ACTION_NAME_MAPPING: Record<EmailActionWithoutEmailTemplate, string> = {
  [RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING]:
    'MBP Reschedule',
  [RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING]:
    'MBP Invitation',
  [RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING]:
    'MBP Restoration',
  [RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION]:
    'Cancel Scheduled Invitation'
}

export const getAdditionalActions = ({
  additionalActions
}: Pick<ScreeningRoleStepFragment, 'additionalActions'>) => {
  if (!additionalActions?.nodes?.length) {
    return
  }

  return additionalActions.nodes
    .filter(
      ({ actionName }) =>
        ![
          RoleStepAdditionalActionName.UNAPPROVE_ROLE_STEP,
          RoleStepAdditionalActionName.UNCLAIM_ROLE_STEP,
          RoleStepAdditionalActionName.REASSIGN_ROLE_STEP
        ].includes(actionName)
    )
    .map(({ actionName, emailTemplate }) => {
      let actionText =
        emailTemplate?.name ||
        ACTION_NAME_MAPPING[actionName as EmailActionWithoutEmailTemplate]

      if (
        actionName !==
        RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION
      ) {
        actionText = `Send Email: ${actionText}`
      }

      return {
        actionText,
        actionName,
        emailTemplate
      }
    })
}
