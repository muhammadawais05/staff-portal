import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import {
  OperationCallableTypes,
  RoleStepMainActions
} from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useModal } from '@staff-portal/modals-service'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { createScreeningRoleStepFragmentMock } from '../../data/get-talent-screening-role-steps/mocks'
import ScreeningStepButton from './ScreeningStepButton'
import ApproveGenericRoleStepModal from '../ApproveGenericRoleStepModal/ApproveGenericRoleStepModal'
import ApproveEnglishStepModal from '../ApproveEnglishStepModal/ApproveEnglishStepModal'
import ClaimEnglishStepModal from '../ClaimEnglishStepModal/ClaimEnglishStepModal'
import ClaimGenericStepModal from '../ClaimGenericStepModal/ClaimGenericStepModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  useModal: jest.fn()
}))

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: () => ({ id: CURRENT_USER_ID })
}))

jest.mock('../ScreeningStepMenuButton', () => ({
  ScreeningStepMenuButton: () => <div data-testid='menu-button' />
}))

const CURRENT_USER_ID = '42'
const useModalMock = useModal as jest.Mock
const showModal = jest.fn()
const nextAction = jest.fn()
const TALENT_ID = 'talent-id'

const arrangeTest = (props: ScreeningRoleStepFragment) => {
  useModalMock.mockReturnValue({ showModal })

  return render(
    <TestWrapperWithMocks>
      <ScreeningStepButton
        node={props}
        triggerNextAction={nextAction}
        talentId={TALENT_ID}
      />
    </TestWrapperWithMocks>
  )
}

describe('ScreeningStepButton', () => {
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

  it('renders default state without missing interview icon', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
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

    const { container, getByTestId, queryByTestId } = arrangeTest(step)

    expect(container.innerHTML).toContain('Indicator')
    expect(container.innerHTML).toContain('light-grey')
    expect(getByTestId('menu-button')).toBeInTheDocument()
    expect(queryByTestId('step-calendar-icon')).not.toBeInTheDocument()
  })

  it('renders calendar icon when missing invitation interview', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        interviewInvitationMissing: true,
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      }
    })

    const { getByTestId } = arrangeTest(step)

    expect(getByTestId('step-calendar-icon')).toBeInTheDocument()
  })

  it('renders reminder icon when invitation interview is scheduled', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        interviewInvitationScheduled: true,
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      }
    })

    const { getByTestId, queryByTestId } = arrangeTest(step)

    expect(queryByTestId('step-calendar-icon')).not.toBeInTheDocument()
    expect(getByTestId('step-clock-icon')).toBeInTheDocument()
  })

  it('handles approve english main action', () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
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

    arrangeTest(step)

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ApproveEnglishStepModal, {
      onSuccess: nextAction,
      roleStepId: step.id,
      talentId: TALENT_ID
    })
  })

  it('handles approve portfolio main action', async () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.APPROVE_PORTFOLIO_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      },
      screeningStepMock: {
        title: 'Portfolio'
      }
    })

    const { findByText } = arrangeTest(step)

    fireEvent.click(await findByText('Portfolio'))

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ApproveGenericRoleStepModal, {
      onSuccess: nextAction,
      roleStepId: step.id,
      talentId: TALENT_ID
    })
  })

  it('handles claim english step action', async () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.CLAIM_ENGLISH_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      },
      screeningStepMock: {
        title: 'Claim English'
      }
    })

    const { findByText } = arrangeTest(step)

    fireEvent.click(await findByText('Claim English'))

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ClaimEnglishStepModal, {
      onSuccess: nextAction,
      roleStepId: step.id,
      talentId: TALENT_ID
    })
  })

  it('handles claim role step main action', async () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.CLAIM_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      },
      screeningStepMock: {
        title: 'Generic Claim'
      }
    })

    const { findByText } = arrangeTest(step)

    fireEvent.click(await findByText('Generic Claim'))

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ClaimGenericStepModal, {
      onSuccess: nextAction,
      roleStepId: step.id,
      talentId: TALENT_ID
    })
  })

  it('handles claim portfolio review step main action', async () => {
    const step = createScreeningRoleStepFragmentMock({
      mock: {
        status: 'initiated',
        claimer: {
          id: '1',
          __typename: 'Talent'
        },
        mainAction: {
          actionName: RoleStepMainActions.CLAIM_PORTFOLIO_ROLE_STEP,
          status: OperationCallableTypes.ENABLED
        }
      },
      screeningStepMock: {
        title: 'Claim Portfolio Review'
      }
    })

    const { findByText } = arrangeTest(step)

    fireEvent.click(await findByText('Claim Portfolio Review'))

    expect(useModalMock).toHaveBeenCalledTimes(1)
    expect(useModalMock).toHaveBeenCalledWith(ClaimGenericStepModal, {
      onSuccess: nextAction,
      roleStepId: step.id,
      talentId: TALENT_ID
    })
  })
})
