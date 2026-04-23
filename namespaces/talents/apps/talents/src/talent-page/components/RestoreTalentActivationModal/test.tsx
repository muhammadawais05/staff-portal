import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import { useRestoreTalentActivation } from './data'
import RestoreTalentActivationModal from './RestoreTalentActivationModal'
import { useGetResumeTalentApplicationDetails } from '../ResumeTalentApplicationGenericModal/data'
import { ResumeTalentApplicationGenericModalContentProps } from '../ResumeTalentApplicationGenericModal/types'

jest.mock('../ResumeTalentApplicationGenericModal/data', () => ({
  __esModule: true,
  useGetResumeTalentApplicationDetails: jest.fn()
}))

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    __esModule: true,
    useGetOperation: jest.fn()
  })
)

jest.mock('./data', () => ({
  __esModule: true,
  useRestoreTalentActivation: jest.fn()
}))

const mockReturnValues = ({
  eligibleForAutomaticRestore,
  specializations,
  specializationApplications
}: Partial<ResumeTalentApplicationGenericModalContentProps> = {}) => {
  const mockUseGetOperation = useGetOperation as jest.Mock

  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })

  const mockUseGetResumeTalentApplicationDetails =
    useGetResumeTalentApplicationDetails as jest.Mock

  mockUseGetResumeTalentApplicationDetails.mockReturnValue({
    specializations,
    specializationApplications,
    eligibleForAutomaticRestore,
    loading: false
  })

  const mockUseRestoreTalentActivation = useRestoreTalentActivation as jest.Mock

  mockUseRestoreTalentActivation.mockReturnValue([
    () => ({
      data: {
        restoreTalentActivation: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
}

const arrangeTest = ({
  talentId = '123',
  hideModal = jest.fn(),
  eligibleForAutomaticRestore,
  specializations,
  specializationApplications
}: Partial<ResumeTalentApplicationGenericModalContentProps>) => {
  mockReturnValues({
    eligibleForAutomaticRestore,
    specializations,
    specializationApplications
  })

  return render(
    <TestWrapperWithMocks>
      <RestoreTalentActivationModal talentId={talentId} hideModal={hideModal} />
    </TestWrapperWithMocks>
  )
}

describe('RestoreTalentActicationModal', () => {
  it('shows the restore talent activation modal', async () => {
    arrangeTest({})

    expect(
      screen.getByText('Restore Application (exceptional)')
    ).toBeInTheDocument()

    expect(screen.getByText('Exceptional Restoration')).toBeInTheDocument()

    expect(
      screen.getByText(
        'WARNING: This talent was rejected more than 18 months ago!'
      )
    ).toBeInTheDocument()

    expect(screen.queryByLabelText('Specialization')).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText('Automatically send MBP restoration email')
    ).not.toBeInTheDocument()
  })

  it('shows success message', async () => {
    arrangeTest({ eligibleForAutomaticRestore: true })

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: 'some comment' }
    })

    fireEvent.click(
      screen.getByRole('button', { name: /Restore Application/i })
    )

    expect(
      await screen.findByText('Application has been restored.')
    ).toBeInTheDocument()
  })

  it('hides the warning message', () => {
    arrangeTest({ eligibleForAutomaticRestore: true })

    expect(
      screen.queryByText(
        'WARNING: This talent was rejected more than 18 months ago!'
      )
    ).not.toBeInTheDocument()

    expect(
      screen.queryByText('Restore Application (exceptional)')
    ).not.toBeInTheDocument()

    expect(screen.getAllByText('Restore Application')).toHaveLength(2)
  })

  it('hides the specialization select', () => {
    arrangeTest({
      specializations: [{ id: '1', title: 'Option 1' }]
    })

    expect(screen.queryByLabelText('Specialization')).not.toBeInTheDocument()
  })

  it('shows the specialization select', () => {
    arrangeTest({
      specializations: [
        { id: '1', title: 'Option 1' },
        { id: '2', title: 'Option 2' },
        { id: '3', title: 'Option 3' }
      ],
      specializationApplications: [{ id: '2', title: 'Option 2' }]
    })

    expect(screen.getByLabelText(/Specialization/)).toBeInTheDocument()
    const specializationInputElement =
      document.getElementById('specializationId')

    expect(specializationInputElement).toHaveValue('Option 2')
  })
})
