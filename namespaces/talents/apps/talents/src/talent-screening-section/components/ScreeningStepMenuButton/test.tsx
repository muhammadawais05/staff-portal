import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { RoleStepAdditionalActionName } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { ScreeningRoleStepFragment } from '../../data/get-talent-screening-role-steps'
import { createScreeningRoleStepFragmentMock } from '../../data/get-talent-screening-role-steps/mocks'
import ScreeningStepMenuButton from './ScreeningStepMenuButton'

jest.mock('@staff-portal/ui/src/components/StepButton', () => ({
  __esModule: true,
  StepMenuButton: ({ children }: { children: JSX.Element }) => <>{children}</>
}))

const mockedShowEmailModal = jest.fn()
const mockedShowRestoreBookingModal = jest.fn()
const mockedShowIntroduceBookingModal = jest.fn()
const mockedShowRescheduleBookingModal = jest.fn()
const mockedShowCancelScheduledInvitationModal = jest.fn()

const mockedFunctions = [
  mockedShowEmailModal,
  mockedShowRestoreBookingModal,
  mockedShowIntroduceBookingModal,
  mockedShowRescheduleBookingModal
]

const actions: [RoleStepAdditionalActionName, jest.Mock][] = [
  RoleStepAdditionalActionName.SEND_EMAIL_TO,
  RoleStepAdditionalActionName.RESTORE_TALENT_SCREENING_BOOKING,
  RoleStepAdditionalActionName.INTRODUCE_TALENT_SCREENING_BOOKING,
  RoleStepAdditionalActionName.RESCHEDULE_TALENT_SCREENING_BOOKING
].map((actionName, index) => [actionName, mockedFunctions[index]])

jest.mock(
  '../../modals/SendIntroduceScreeningEmailModal/services/use-send-introduce-booking-email-modal/use-send-introduce-booking-email-modal',
  () => ({
    useSendIntroduceBookingEmailModal: () => ({
      showModal: mockedShowIntroduceBookingModal,
      renderModal: jest.fn()
    })
  })
)
jest.mock(
  '../../modals/SendRestoreScreeningEmailModal/services/use-send-restore-booking-email-modal/use-send-restore-booking-email-modal',
  () => ({
    useSendRestoreBookingEmailModal: () => ({
      showModal: mockedShowRestoreBookingModal,
      renderModal: jest.fn()
    })
  })
)
jest.mock('@staff-portal/talents', () => ({
  ...jest.requireActual('@staff-portal/talents'),
  useSendRescheduleScreeningEmailModal: () => ({
    showModal: mockedShowRescheduleBookingModal,
    renderModal: jest.fn()
  })
}))

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  useSendEmailModal: () => ({
    showModal: mockedShowEmailModal
  })
}))

jest.mock('../UnclaimScreeningStepModal', () => ({
  __esModule: true,
  useUnclaimScreeningStepModal: () => ({
    renderOperation: jest.fn(),
    renderModal: jest.fn()
  })
}))

jest.mock('../ReassignScreeningStepModal', () => ({
  __esModule: true,
  useReassignScreeningStepModal: () => ({
    renderOperation: jest.fn(),
    renderModal: jest.fn()
  })
}))

jest.mock('../ResetScreeningStepModal', () => ({
  __esModule: true,
  useResetScreeningStepModal: () => ({
    renderOperation: jest.fn(),
    renderModal: jest.fn()
  })
}))

jest.mock('../CancelScheduledInvitationModal', () => ({
  __esModule: true,
  useCancelScheduledInvitationModal: () => ({
    showModal: mockedShowCancelScheduledInvitationModal
  })
}))

const arrangeTest = (props: Partial<ScreeningRoleStepFragment>) => {
  return render(
    <TestWrapper>
      <ScreeningStepMenuButton
        roleStep={createScreeningRoleStepFragmentMock({
          mock: props
        })}
      />
    </TestWrapper>
  )
}

describe('ScreeningStepMenuButton', () => {
  it('shows empty state', async () => {
    arrangeTest({
      additionalActions: { nodes: [] }
    })

    expect(screen.getByText('No additional actions')).toBeInTheDocument()
  })

  it.each(actions)(
    'shows send email option for %s',
    async (actionName, mockedFunction) => {
      arrangeTest({
        additionalActions: {
          nodes: [
            {
              actionName,
              emailTemplate: { id: 'test', name: 'test name' }
            }
          ]
        }
      })

      fireEvent.click(screen.getByText(/Send Email/i))
      expect(mockedFunction).toHaveBeenCalledTimes(1)
    }
  )

  it(`shows send email option for ${RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION}`, () => {
    arrangeTest({
      additionalActions: {
        nodes: [
          {
            actionName:
              RoleStepAdditionalActionName.CANCEL_SCHEDULED_INTERVIEW_INVITATION,
            emailTemplate: { id: 'test', name: 'test name' }
          }
        ]
      }
    })

    fireEvent.click(screen.getByText(/test name/i))
    expect(mockedShowCancelScheduledInvitationModal).toHaveBeenCalledTimes(1)
  })
})
