import { render } from '@testing-library/react'
import React from 'react'
import { JobStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobTaskCardMainAction, { Props } from './JobTaskCardMainAction'

jest.mock('@staff-portal/jobs', () => ({
  ClaimAndApproveJobButton: () => <div data-testid='approve-job-button' />
}))

jest.mock('@staff-portal/engagements', () => ({
  SendEngagementClientEmailItem: () => (
    <div data-testid='send-engagement-client-email-item' />
  )
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobTaskCardMainAction {...props} />
    </TestWrapper>
  )

describe('JobTaskCardMoreActions', () => {
  it('renders send candidate button', () => {
    const { container, getByText } = arrangeTest({
      job: {
        id: 'job-id',
        client: { id: 'client-id' },
        currentEngagement: { nodes: [] },
        operations: {},
        positionQuestions: {},
        sendCandidateUrl: 'https://test.url',
        status: JobStatus.PENDING_ENGINEER,
        webResource: { text: 'title' }
      }
    } as unknown as Props)

    expect(getByText('Send Candidate')).toBeInTheDocument()
    container.querySelector('a')
    expect(container.querySelector('a')).toHaveAttribute(
      'href',
      'https://test.url'
    )
  })

  it('renders send email button', () => {
    const { getByTestId } = arrangeTest({
      job: {
        id: 'job-id',
        client: { id: 'client-id' },
        currentEngagement: {
          nodes: [
            {
              id: '123',
              clientEmailMessaging: {
                id: '123',
                operations: {
                  sendEmailTo: {
                    callable: OperationCallableTypes.ENABLED,
                    messages: []
                  }
                }
              }
            }
          ]
        },
        operations: {},
        positionQuestions: {},
        webResource: { text: 'title' }
      }
    } as unknown as Props)

    expect(getByTestId('send-engagement-client-email-item')).toBeInTheDocument()
  })
})
