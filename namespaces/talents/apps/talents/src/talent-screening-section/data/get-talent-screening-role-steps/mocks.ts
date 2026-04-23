import {
  OperationCallableTypes,
  RoleStepMainActions,
  RoleStepAdditionalActionName,
  SpecializationApplication
} from '@staff-portal/graphql/staff'
import { mapToTypename } from '@staff-portal/test-utils'

import {
  ScreeningRoleStepFragment,
  ScreeningStepFragment
} from './get-talent-screening-role-steps.staff.gql.types'
import { GET_TALENT_SCREENING_ROLE_STEPS } from './get-talent-screening-role-steps.staff.gql'

export const createGetTalentScreeningRoleStepsMock = ({
  talentId,
  screeningRoleSteps,
  fullName = 'Jon Doe',
  status = 'APPLIED',
  specializationApplications = []
}: {
  talentId: string
  screeningRoleSteps: ScreeningRoleStepFragment[]
  fullName?: string
  status?: string
  specializationApplications?: SpecializationApplication[]
}) => ({
  request: {
    query: GET_TALENT_SCREENING_ROLE_STEPS,
    variables: { talentId }
  },
  result: {
    data: {
      node: {
        id: talentId,
        fullName,
        screeningRoleSteps: {
          nodes: mapToTypename(screeningRoleSteps, 'RoleStep').map(step => ({
            ...step,
            step: { ...step.step, __typename: 'Step' },
            operations: {
              reassignRoleStep: {
                callable: OperationCallableTypes.HIDDEN,
                messages: [],
                __typename: 'Operation'
              },
              unclaimRoleStep: {
                callable: OperationCallableTypes.HIDDEN,
                messages: [],
                __typename: 'Operation'
              },
              unapproveRoleStep: {
                callable: OperationCallableTypes.HIDDEN,
                messages: [],
                __typename: 'Operation'
              },
              cancelScheduledInterviewInvitation: {
                callable: OperationCallableTypes.HIDDEN,
                messages: [],
                __typename: 'Operation'
              },
              __typename: 'RoleStepOperations'
            },
            stepInvolvesMeeting: false,
            additionalActions: null,
            mainAction: {
              __typename: 'RoleStepMainAction',
              ...step.mainAction
            },
            talent: {
              id: talentId,
              __typename: 'Talent'
            }
          })),
          __typename: 'TalentScreeningRoleStepConnection'
        },
        status: status,
        specializationApplications: {
          nodes: specializationApplications,
          __typename: 'SpecializationApplicationConnection'
        },
        __typename: 'Talent'
      }
    }
  }
})

export const createGetTalentScreeningRoleStepsFailedMock = (
  talentId: string,
  errorMessage = 'fake error message.'
) => ({
  request: { query: GET_TALENT_SCREENING_ROLE_STEPS, variables: { talentId } },
  error: new Error(errorMessage)
})

export const createScreeningStepFragmentMock = ({
  mock
}: {
  mock: Partial<ScreeningStepFragment>
}) => ({
  id: '123',
  stepType: 'technical_one',
  title: 'Technical 1 Core',
  short: 'Technical 1 Core',
  __typename: 'Step',
  ...mock
})

export const createScreeningRoleStepFragmentMock = ({
  mock,
  screeningStepMock
}: {
  mock: Partial<ScreeningRoleStepFragment>
  screeningStepMock?: Partial<ScreeningStepFragment>
}) => ({
  id: 'VjEtUm9sZVN0ZXAtdmlydHVhbF9yb2xlX2lkPTI0NjE3NDImc3RlcF9pZD0xNg',
  status: 'initiated',
  stepInvolvesMeeting: true,
  talent: {
    id: 'VjEtVGFsZW50LTI0NjE3NDI',
    __typename: 'Talent'
  },
  step: {
    id: '123',
    stepType: 'technical_one',
    title: 'Technical 1 Core',
    short: 'Technical 1 Core',
    __typename: 'Step',
    ...screeningStepMock
  },
  claimer: null,
  mainAction: {
    actionName: RoleStepMainActions.CLAIM_TECHNICAL_ONE_ROLE_STEP,
    status: OperationCallableTypes.ENABLED,
    tooltip: 'Unclaimed step',
    __typename: 'RoleStepMainAction'
  },
  operations: {
    reassignRoleStep: {
      callable: OperationCallableTypes.HIDDEN,
      messages: ['Step is not claimed'],
      __typename: 'Operation'
    },
    unclaimRoleStep: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [
        'Something went wrong. Please try again later.',
        'Step is not claimed'
      ],
      __typename: 'Operation'
    },
    unapproveRoleStep: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    cancelScheduledInterviewInvitation: {
      callable: OperationCallableTypes.HIDDEN,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'RoleStepOperations'
  },
  additionalActions: {
    nodes: [
      {
        actionName:
          RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING,
        emailTemplate: null,
        __typename: 'RoleStepAdditionalAction'
      },
      {
        actionName:
          RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING,
        emailTemplate: null,
        __typename: 'RoleStepAdditionalAction'
      },
      {
        actionName:
          RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING,
        emailTemplate: null,
        __typename: 'RoleStepAdditionalAction'
      }
    ],
    __typename: 'RoleStepAdditionalConnection'
  },
  ...mock,
  __typename: 'RoleStep'
})
