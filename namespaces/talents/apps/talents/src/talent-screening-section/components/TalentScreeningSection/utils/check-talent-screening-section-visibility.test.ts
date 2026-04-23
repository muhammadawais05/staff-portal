import {
  OperationCallableTypes,
  RoleStepMainActions,
  SpecializationApplication
} from '@staff-portal/graphql/staff'

import {
  createGetTalentScreeningRoleStepsMock,
  createScreeningRoleStepFragmentMock
} from '../../../data/get-talent-screening-role-steps/mocks'
import { checkTalentScreeningSectionVisibility } from './check-talent-screening-section-visibility'

const TALENT_ID = '123'

const getTalentMock = (
  status: string,
  specializationApplications?: SpecializationApplication[]
) =>
  createGetTalentScreeningRoleStepsMock({
    talentId: TALENT_ID,
    screeningRoleSteps: defaultMockSteps,
    status,
    specializationApplications
  })

const defaultMockSteps = [
  createScreeningRoleStepFragmentMock({
    mock: {
      status: 'approved',
      claimer: {
        id: '1234',
        __typename: 'Talent'
      },
      interviewInvitationMissing: null,
      mainAction: {
        actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
        status: OperationCallableTypes.ENABLED,
        tooltip: ''
      }
    },
    screeningStepMock: {
      title: 'English'
    }
  })
]

describe('checkTalentScreeningSectionVisibility', () => {
  it.each([
    [defaultMockSteps, getTalentMock('APPLIED')],
    [defaultMockSteps, getTalentMock('PENDING_PROFILE')],
    [defaultMockSteps, getTalentMock('applied')],
    [
      defaultMockSteps,
      getTalentMock('WRONG_STATUS', [
        { specialization: null } as SpecializationApplication,
        { specialization: {} } as SpecializationApplication
      ])
    ]
  ])('returns true', (roleSteps, data) => {
    expect(
      checkTalentScreeningSectionVisibility(roleSteps, data.result.data.node)
    ).toBe(true)
  })

  it.each([
    [undefined, getTalentMock('APPLIED')],
    [undefined, getTalentMock('PENDING_PROFILE')],
    [
      undefined,
      getTalentMock('WRONG_STATUS', [
        { specialization: {} } as SpecializationApplication
      ])
    ],
    [defaultMockSteps, getTalentMock('WRONG_STATUS')],
    [
      defaultMockSteps,
      getTalentMock('WRONG_STATUS', [
        { specialization: null } as SpecializationApplication
      ])
    ]
  ])('returns false', (roleSteps, data) => {
    expect(
      checkTalentScreeningSectionVisibility(roleSteps, data.result.data.node)
    ).toBe(false)
  })
})
