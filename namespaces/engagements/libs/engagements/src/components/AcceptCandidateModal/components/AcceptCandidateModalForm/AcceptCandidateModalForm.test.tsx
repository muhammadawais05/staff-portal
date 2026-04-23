import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode, useMutation } from '@staff-portal/data-layer-service'
import { useGetAvailableTimeZones } from '@staff-portal/date-time-utils'
import { Form } from '@toptal/picasso-forms'

import AcceptCandidateModalForm from './AcceptCandidateModalForm'
import { AcceptCandidateModalFragment } from '../../data'
import { useNavigateToJobPage } from '../../../../services'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useGetNode: jest.fn(),
  useMutation: jest.fn()
}))
jest.mock('@staff-portal/modals-service')
jest.mock('@staff-portal/date-time-utils', () => ({
  ...jest.requireActual('@staff-portal/date-time-utils'),
  useGetAvailableTimeZones: jest.fn()
}))
jest.mock('../../../../services', () => ({
  useNavigateToJobPage: jest.fn()
}))

jest.mock('@staff-portal/forms/FormDatePickerWrapper', () => ({
  __esModule: true,
  default: () => <div data-testid='form-date-picker-wrapper' />
}))

const mockUseGetNode = useGetNode as jest.Mock
const mockUseGetAvailableTimeZones = useGetAvailableTimeZones as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const mockUseNavigateToJobPage = useNavigateToJobPage as jest.Mock

const arrangeTest = ({
  clientHasUnpaidDepositInvoices,
  navigateToJobPage
}: Partial<{
  clientHasUnpaidDepositInvoices: boolean
  navigateToJobPage: () => void
}> = {}) => {
  const timezones = [
    { name: '(UTC-11:00) Pacific - Midway', value: 'Pacific/Midway' },
    { name: '(UTC-07:00) America - Los Angeles', value: 'America/Los_Angeles' },
    { name: '(UTC+05:30) Asia - Calcutta', value: 'Asia/Calcutta' }
  ]
  const acceptCandidateData = {
    client: {
      timeZone: {
        name: '(UTC-07:00) America - Los Angeles',
        value: 'America/Los_Angeles'
      },
      hasUnpaidDepositInvoices: clientHasUnpaidDepositInvoices
    },
    job: {
      id: '999'
    },
    talent: {
      timeZone: {
        name: '(UTC+05:30) Asia - Calcutta'
      }
    }
  } as AcceptCandidateModalFragment

  mockUseGetNode.mockReturnValue(() => ({
    data: acceptCandidateData,
    loading: false
  }))
  mockUseGetAvailableTimeZones.mockReturnValue({
    timezones,
    loading: false
  })
  mockUseMutation.mockReturnValue([
    () => ({
      data: {
        scheduleEngagementActivationStartDate: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ])
  mockUseNavigateToJobPage.mockReturnValue({
    navigateToJobPage: navigateToJobPage ?? jest.fn()
  })

  return render(
    <TestWrapper>
      <Form onSubmit={jest.fn()}>
        <AcceptCandidateModalForm engagementId='123' hideModal={jest.fn()} />
      </Form>
    </TestWrapper>
  )
}

describe('AcceptCandidateModalForm', () => {
  it('shows form fields', () => {
    arrangeTest({ clientHasUnpaidDepositInvoices: false })

    expect(screen.getByTestId('form-date-picker-wrapper')).toBeInTheDocument()
    expect(
      screen.getByTestId('accept-candidate-modal-form-question')
    ).toHaveTextContent(
      'Are you sure that you want to approve this developer for the job? By doing so, you confirm that client accepted this candidate and ready to start working on a date specified below.'
    )
    expect(
      screen.queryByText('Company has an unpaid deposit.')
    ).not.toBeInTheDocument()
  })

  it('shows unpaid message', () => {
    arrangeTest({ clientHasUnpaidDepositInvoices: true })

    expect(
      screen.getByText('Company has an unpaid deposit.')
    ).toBeInTheDocument()
  })

  it('navigates to job page', async () => {
    const navigateToJobPageMock = jest.fn()

    arrangeTest({ navigateToJobPage: navigateToJobPageMock })

    fireEvent.click(screen.getByTestId('submit-button'))

    expect(navigateToJobPageMock).toHaveBeenCalledWith('999')
  })
})
