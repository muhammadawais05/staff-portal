import { render } from '@testing-library/react'
import React from 'react'
import {
  OperationCallableTypes,
  RoleStepMainActions
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { createScreeningRoleStepFragmentMock } from '../../data/get-talent-screening-role-steps/mocks'
import ScreeningStepDefaultButton from './ScreeningStepDefaultButton'

const CURRENT_USER_ID = '42'

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: () => ({ id: CURRENT_USER_ID })
}))

jest.mock('../ScreeningStepMenuButton', () => ({
  __esModule: true,
  ScreeningStepMenuButton: () => <div data-testid='menu-button' />
}))

const arrangeTest = (node: ScreeningRoleStepFragment) => {
  return render(
    <TestWrapper>
      <ScreeningStepDefaultButton node={node} />
    </TestWrapper>
  )
}

describe('ScreeningStepDefaultButton', () => {
  it('renders approved state', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'approved',
        claimer: {
          id: '1234',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED,
          tooltip: null
        }
      }
    })

    const { container } = arrangeTest(step)

    expect(container.innerHTML).toContain('green')
  })

  it('renders claimed by current user state', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'claimed',
        claimer: {
          id: CURRENT_USER_ID,
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      }
    })

    const { container } = arrangeTest(step)

    expect(container.innerHTML).toContain('yellow')
  })

  it('renders claimed by other state', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'claimed',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      }
    })

    const { container } = arrangeTest(step)

    expect(container.innerHTML).toContain('blue')
  })

  it('renders claim english step', async () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'approved',
        claimer: {
          id: '1',
          __typename: 'Staff'
        },
        mainAction: {
          actionName: null,
          status: OperationCallableTypes.HIDDEN
        }
      },
      screeningStepMock: {
        title: 'Claim English'
      }
    })

    const { findByText } = arrangeTest(step)

    expect(await findByText('Claim English')).toBeInTheDocument()
  })
})
