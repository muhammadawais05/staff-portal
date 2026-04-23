import React from 'react'
import { render, screen } from '@testing-library/react'
import { waitForElementToBeRemoved } from '@toptal/picasso/test-utils'
import {
  RoleStepMainActions,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import TalentScreeningSection, {
  Props as TalentScreeningSectionProps
} from './TalentScreeningSection'
import {
  createGetTalentScreeningRoleStepsMock,
  createScreeningRoleStepFragmentMock
} from '../../data/get-talent-screening-role-steps/mocks'
import useNextAction from './hooks/use-next-action'

jest.mock('./hooks/use-next-action')

const arrangeTest = (
  props: TalentScreeningSectionProps,
  mocks: MockedResponse[]
) => {
  return render(
    <TestWrapperWithMocks mocks={mocks}>
      <TalentScreeningSection {...props} />
    </TestWrapperWithMocks>
  )
}

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

describe('TalentScreeningSection', () => {
  it('renders section', async () => {
    const mockedUseNextAction = useNextAction as jest.Mock

    mockedUseNextAction.mockImplementation(() => ({
      triggerNextAction: () => {},
      renderModals: () => null
    }))

    const talentId = '123'

    arrangeTest({ talentId }, [
      createGetTalentScreeningRoleStepsMock({
        talentId,
        screeningRoleSteps: defaultMockSteps
      })
    ])

    await waitForElementToBeRemoved(() => screen.getAllByRole('presentation'))

    expect(screen.getByText('Screening')).toBeInTheDocument()
    expect(screen.getByText(defaultMockSteps[0].step.title)).toBeInTheDocument()

    expect(mockedUseNextAction).toHaveBeenCalledWith({ talentId })
  })
})
