import {
  RoleStepAdditionalActionName,
  RoleStepAdditionalAction,
  EmailTemplate
} from '@staff-portal/graphql/staff'

import { getAdditionalActions } from './get-additional-actions'

describe('getAdditionalActions', () => {
  it('returns nothing', () => {
    expect(
      getAdditionalActions({
        additionalActions: {
          nodes: []
        }
      })
    ).toBeUndefined()

    const actionsToBeFilteredOut: RoleStepAdditionalAction[] = [
      RoleStepAdditionalActionName.UNAPPROVE_ROLE_STEP,
      RoleStepAdditionalActionName.UNCLAIM_ROLE_STEP,
      RoleStepAdditionalActionName.REASSIGN_ROLE_STEP
    ].map(actionName => ({
      actionName,
      emailTemplate: null
    }))

    expect(
      getAdditionalActions({
        additionalActions: {
          nodes: actionsToBeFilteredOut
        }
      })
    ).toStrictEqual([])
  })

  it('maps correct send email actions', () => {
    const emailActions: RoleStepAdditionalAction[] = [
      ...[
        RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING,
        RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING,
        RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING
      ].map(actionName => ({
        actionName,
        emailTemplate: null
      })),
      {
        actionName: RoleStepAdditionalActionName.SEND_EMAIL_TO,
        emailTemplate: {
          id: 'asd',
          name: 'test'
        } as EmailTemplate
      }
    ]

    expect(
      getAdditionalActions({
        additionalActions: {
          nodes: emailActions
        }
      })
    ).toStrictEqual([
      {
        actionName:
          RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING,
        actionText: 'Send Email: MBP Reschedule',
        emailTemplate: null
      },
      {
        actionName:
          RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING,
        actionText: 'Send Email: MBP Invitation',
        emailTemplate: null
      },
      {
        actionName:
          RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING,
        actionText: 'Send Email: MBP Restoration',
        emailTemplate: null
      },
      {
        actionName: RoleStepAdditionalActionName.SEND_EMAIL_TO,
        actionText: 'Send Email: test',
        emailTemplate: {
          id: 'asd',
          name: 'test'
        }
      }
    ])
  })
})
