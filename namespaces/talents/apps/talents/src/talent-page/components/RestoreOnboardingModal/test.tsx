import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import { useRestoreOnboardingTalent } from './data'
import RestoreOnboardingModal from './RestoreOnboardingModal'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    useGetOperation: jest.fn()
  })
)

jest.mock('./data', () => ({
  __esModule: true,
  useRestoreOnboardingTalent: jest.fn()
}))

const mockOperation = () => {
  const mockUseGetOperation = useGetOperation as jest.Mock

  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })
}

const mockReturnValues = () => {
  const mockUseRestoreOnboardingTalent = useRestoreOnboardingTalent as jest.Mock

  mockUseRestoreOnboardingTalent.mockReturnValue([
    () => ({
      data: {
        restoreOnboardingTalent: {
          success: true,
          errors: [],
          emailTemplate: { id: '123' }
        }
      }
    }),
    { loading: false }
  ])
}

const arrangeTest = (
  { onSendEmail }: { onSendEmail: () => void } = { onSendEmail: () => {} }
) =>
  render(
    <TestWrapper>
      <RestoreOnboardingModal
        talentId='1'
        hideModal={() => {}}
        onSendEmail={onSendEmail}
      />
    </TestWrapper>
  )

describe('RestoreOnboardingModal', () => {
  it('shows the restore onboarding modal', async () => {
    const onSendEmail = jest.fn()

    mockReturnValues()
    mockOperation()
    arrangeTest({ onSendEmail })

    expect(
      screen.getByText(
        "Do you really want to restore the applicant's onboarding process?"
      )
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'some comment' }
    })

    fireEvent.click(screen.getByText('Restore'))

    expect(
      await screen.findByText(
        'Application has been restored. The talent was notified about the missing application details.'
      )
    ).toBeInTheDocument()

    expect(onSendEmail).toHaveBeenCalledWith('123')
  })

  it('shows the error message', async () => {
    const mockUseRestoreOnboardingTalent =
      useRestoreOnboardingTalent as jest.Mock

    mockUseRestoreOnboardingTalent.mockImplementation(
      ({ onError }: { onError: () => void }) => [
        () => onError(),
        { loading: false }
      ]
    )
    mockOperation()
    arrangeTest()

    expect(
      screen.getByText(
        "Do you really want to restore the applicant's onboarding process?"
      )
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'some comment' }
    })

    fireEvent.click(screen.getByText('Restore'))

    expect(
      await screen.findByText(
        'An error occurred, cannot restore the onboarding process.'
      )
    ).toBeInTheDocument()
  })
})
