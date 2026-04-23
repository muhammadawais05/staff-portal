import React from 'react'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, useFormState } from '@toptal/picasso-forms'
import { TestWrapper } from '@staff-portal/test-utils'

import RequestAvailabilityForm from './RequestAvailabilityForm'
import { useGetTalentAvailabilityRequest } from './data'

jest.mock('../FormJobSelection', () => () => (
  <div data-testid='job-selection' />
))

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-forms'),
  useFormState: jest.fn()
}))

jest.mock('./data')

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <RequestAvailabilityForm talentId='id' />
      </Form>
    </TestWrapper>
  )

const mockedUseGetTalentAvailabilityRequest =
  useGetTalentAvailabilityRequest as jest.Mock
const mockUseFormState = useFormState as jest.Mock

describe('RequestAvailabilityForm', () => {
  beforeEach(() => {
    mockUseFormState.mockReturnValue({
      values: {
        jobId: '1'
      }
    })
  })

  it('renders default inputs', () => {
    mockedUseGetTalentAvailabilityRequest.mockReturnValue({
      data: null,
      loading: false
    })

    arrangeTest()

    expect(screen.getByLabelText(/Company/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Comment/)).toBeInTheDocument()
  })

  it('renders job selection section', () => {
    mockedUseGetTalentAvailabilityRequest.mockReturnValue({
      data: { node: { jobAvailabilityRequests: {} } },
      loading: false
    })

    arrangeTest()

    expect(screen.getByTestId('job-selection')).toBeInTheDocument()
  })

  describe('when talent is restricted for mass AR send out', () => {
    it('renders "reasonForOverride" selection section and notification', () => {
      mockedUseGetTalentAvailabilityRequest.mockReturnValue({
        data: {
          node: {
            jobAvailabilityRequests: {
              edges: [
                {
                  job: {
                    id: '1'
                  },
                  availabilityRequest: null,
                  restrictionWarning: 'Alex Mason has already confirmed'
                }
              ]
            }
          }
        },
        loading: false
      })

      arrangeTest()

      expect(
        screen.getByTestId('reasonForOverrideSelection')
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Alex Mason has already confirmed/)
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('recentlyConfirmedARNotification')
      ).toBeInTheDocument()
    })
  })

  describe('when talent is not restricted', () => {
    it('should not render "reasonForOverride" selection section and alert', () => {
      mockedUseGetTalentAvailabilityRequest.mockReturnValue({
        data: {
          node: {
            jobAvailabilityRequests: {
              edges: [
                {
                  job: {
                    id: '1'
                  },
                  availabilityRequest: null,
                  restrictionWarning: null
                }
              ]
            }
          }
        },
        loading: false
      })

      arrangeTest()

      expect(
        screen.queryByTestId('reasonForOverrideSelection')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('recentlyConfirmedARNotification')
      ).not.toBeInTheDocument()
    })
  })

  describe('when user chooses "Other" option for Reason for Override', () => {
    it('renders "yourReasonForOverride" section', async () => {
      mockedUseGetTalentAvailabilityRequest.mockReturnValue({
        data: {
          node: {
            jobAvailabilityRequests: {
              edges: [
                {
                  job: {
                    id: '1'
                  },
                  availabilityRequest: null,
                  restrictionWarning: 'Alex Mason has already confirmed'
                }
              ]
            }
          }
        },
        loading: false
      })

      arrangeTest()

      userEvent.type(screen.getByLabelText(/Comment/), 'comment')
      userEvent.click(screen.getByLabelText(/Reason for Override/))
      userEvent.click(await screen.findByText('Other'))

      expect(screen.getByTestId('yourReasonForOverride')).toBeInTheDocument()
    })
  })
})
