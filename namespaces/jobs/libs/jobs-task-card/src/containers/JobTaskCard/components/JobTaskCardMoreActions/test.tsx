import { render, screen } from '@testing-library/react'
import React, { ReactNode } from 'react'
import { JobStatus, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobTaskCardMoreActions, { Props } from './JobTaskCardMoreActions'

jest.mock('@staff-portal/tasks', () => ({
  __esModule: true,
  TaskCardLayout: {
    MoreButton: ({
      children,
      hidden
    }: {
      children: ReactNode
      hidden: boolean
    }) => (
      <div hidden={hidden} data-testid='more-button'>
        {children}
      </div>
    )
  }
}))

jest.mock('@staff-portal/engagements', () => ({
  SendEngagementTalentEmailItem: () => (
    <div data-testid='send-engagement-talent-email-item' />
  )
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <JobTaskCardMoreActions {...props} />
    </TestWrapper>
  )

describe('JobTaskCardMoreActions', () => {
  it('is hidden', () => {
    arrangeTest({
      job: {
        id: 'job-id',
        status: JobStatus.PENDING_CLAIM,
        operations: {},
        currentEngagement: { nodes: [] }
      }
    } as unknown as Props)

    expect(screen.getByTestId('more-button')).toHaveAttribute('hidden')
  })

  it('renders search candidates menu item', () => {
    arrangeTest({
      job: {
        id: 'job-id',
        searchCandidatesUrl: 'https://test.url',
        operations: {}
      }
    } as unknown as Props)

    expect(screen.getByTestId('more-button')).toBeInTheDocument()
    expect(screen.getByRole('menuitem')).toHaveAttribute(
      'href',
      'https://test.url'
    )
    expect(screen.getByRole('menuitem')).toHaveTextContent('Search Candidates')
  })

  it('renders email talent menu item', () => {
    arrangeTest({
      job: {
        id: 'job-id',
        operations: {},
        currentEngagement: {
          nodes: [
            {
              id: '123',
              talent: { id: 'talent-id' },
              talentEmailMessaging: {
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
        }
      }
    } as unknown as Props)

    expect(
      screen.getByTestId('send-engagement-talent-email-item')
    ).toBeInTheDocument()
  })
})
