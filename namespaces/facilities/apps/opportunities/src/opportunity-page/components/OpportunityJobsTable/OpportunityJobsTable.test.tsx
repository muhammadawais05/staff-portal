import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { JobStatus as JobStatusType } from '@staff-portal/graphql/staff'

import { OpportunityJobFragment } from '../OpportunityJobsSection/data'
import OpportunityJobsTable from './OpportunityJobsTable'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Typography: () => <div data-testid='opportunity-jobs-loader' />
  }
}))

const TABLE = 'items-table'
const renderComponent = (
  data: OpportunityJobFragment[],
  project: boolean,
  loading: boolean
) =>
  render(
    <TestWrapper>
      <OpportunityJobsTable data={data} loading={loading} project={project} />
    </TestWrapper>
  )

describe('OpportunityJobsTable', () => {
  it('shows loader when loading', () => {
    renderComponent([], true, true)

    expect(screen.getByTestId('opportunity-jobs-loader')).toBeInTheDocument()
  })

  it('shows empty message when no data', () => {
    renderComponent([], true, false)

    expect(
      screen.getByTestId('opportunity-jobs-empty-message').textContent
    ).toBe('No linked jobs.')
  })

  it('shows table with rows for the all opportunities', () => {
    const jobs = [
      {
        id: '1',
        title: 'Test 1',
        status: JobStatusType.ACTIVE,
        talentPortalLink: {
          url: ''
        }
      },
      {
        id: '2',
        title: 'Test 2',
        status: JobStatusType.CLOSED,
        talentPortalLink: {
          url: ''
        }
      },
      {
        id: '3',
        title: 'Test 3',
        status: JobStatusType.PENDING_ENGINEER,
        talentPortalLink: {
          url: ''
        }
      }
    ] as OpportunityJobFragment[]

    renderComponent(jobs, true, false)
    const table = screen.getByTestId(TABLE)

    expect(table).toContainHTML('Test 1')
    expect(table).toContainHTML('Test 2')
    expect(table).toContainHTML('Test 3')

    expect(table).toContainHTML('Active')
    expect(table).toContainHTML('Closed')
    expect(table).toContainHTML('Pending Talent')
  })

  it('shows Stage column for project opportunity', () => {
    const jobs = [
      {
        id: '1',
        status: JobStatusType.CLOSED,
        opportunityStagesNames: 'Identified, Closed won',
        talentPortalLink: {
          url: ''
        }
      }
    ] as OpportunityJobFragment[]

    renderComponent(jobs, true, false)

    expect(screen.getByTestId(TABLE)).toContainHTML('Identified, Closed won')
  })

  it("don't show Stage column for non project opportunity", () => {
    const jobs = [
      {
        id: '1',
        status: JobStatusType.CLOSED,
        opportunityStagesNames: 'Identified, Closed won',
        talentPortalLink: {
          url: ''
        }
      }
    ] as OpportunityJobFragment[]

    renderComponent(jobs, false, false)

    const table = screen.getByTestId(TABLE)

    expect(table).not.toContainHTML('Identified, Closed won')
    expect(table).toContainHTML('Closed')
  })
})
