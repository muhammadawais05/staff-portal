import React from 'react'
import { render } from '@testing-library/react'
import {
  AvailabilityRequestStatus,
  AvailabilityRequestCandidateStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AvailabilityRequestRow, { Props } from './AvailabilityRequestRow'

jest.mock('@staff-portal/ui/src/components/ColoredStatus', () => ({
  __esModule: true,
  default: () => <div data-testid='colored-status' />
}))

jest.mock('../AvailabilityRequestAction', () => ({
  __esModule: true,
  default: () => <div data-testid='availability-request-action' />
}))

jest.mock('../AvailabilityRequestTitle', () => ({
  __esModule: true,
  default: () => <span data-testid='availability-request-title' />
}))

const arrangeTest = ({ availabilityRequest, stripeEven }: Props) =>
  render(
    <TestWrapper>
      <table>
        <tbody>
          <AvailabilityRequestRow
            availabilityRequest={availabilityRequest}
            stripeEven={stripeEven}
          />
        </tbody>
      </table>
    </TestWrapper>
  )

describe('AvailabilityRequestRow', () => {
  it('renders row', () => {
    const props: Props = {
      stripeEven: false,
      availabilityRequest: {
        id: 'test-id',
        status: AvailabilityRequestStatus.PENDING,
        createdAt: '2020-10-31T00:25:27+03:00',
        candidateStatus: AvailabilityRequestCandidateStatus.AVAILABLE_FOR_SEND,
        sendCandidateUrl: 'https://test.url',
        job: {
          id: 'test-job-id',
          webResource: {
            text: 'Principal Security Developer (123)',
            url: 'https://test/staff/jobs/123'
          },
          client: {
            id: 'test-client-id',
            webResource: {
              text: 'Test Company Name',
              url: 'https://test/staff/companies/321'
            }
          }
        }
      }
    }

    const { getByTestId } = arrangeTest(props)

    expect(getByTestId('availability-request-title')).toBeInTheDocument()
    expect(getByTestId('colored-status')).toBeInTheDocument()
    expect(getByTestId('availability-request-action')).toBeInTheDocument()
  })
})
