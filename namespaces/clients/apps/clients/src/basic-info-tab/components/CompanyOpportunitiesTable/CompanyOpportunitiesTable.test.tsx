import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { OpportunityStatus as OpportunityStatusType } from '@staff-portal/graphql/staff'
import { OpportunityFragment } from '@staff-portal/opportunities'

import CompanyOpportunitiesTable from './CompanyOpportunitiesTable'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Typography: () => <div data-testid='company-opportunities-loader' />
  }
}))

const TABLE = 'items-table'
const renderComponent = (
  data: OpportunityFragment[],
  enterprise: boolean,
  loading: boolean
) =>
  render(
    <TestWrapper>
      <CompanyOpportunitiesTable
        data={data}
        loading={loading}
        enterprise={enterprise}
      />
    </TestWrapper>
  )

describe('CompanyOpportunitiesTable', () => {
  it('shows loader when loading', () => {
    renderComponent([], true, true)

    expect(
      screen.getByTestId('company-opportunities-loader')
    ).toBeInTheDocument()
  })

  it('shows empty message when no data', () => {
    renderComponent([], true, false)

    expect(
      screen.getByTestId('company-opportunities-empty-message').textContent
    ).toBe('No related opportunities.')
  })

  it('shows table with rows for the all opportunities', () => {
    const opportunities = [
      {
        id: '1',
        name: 'Test 1',
        status: OpportunityStatusType.ENDED,
        webResource: {
          url: ''
        }
      },
      {
        id: '2',
        name: 'Test 2',
        status: OpportunityStatusType.CLOSED_WON,
        webResource: {
          url: ''
        }
      },
      {
        id: '3',
        name: 'Test 3',
        status: OpportunityStatusType.FULFILLMENT,
        webResource: {
          url: ''
        }
      }
    ] as OpportunityFragment[]

    renderComponent(opportunities, true, false)
    const table = screen.getByTestId(TABLE)

    expect(table).toContainHTML('Test 1')
    expect(table).toContainHTML('Test 2')
    expect(table).toContainHTML('Test 3')

    expect(table).toContainHTML('Stage')

    expect(table).toContainHTML('Ended')
    expect(table).toContainHTML('Closed Won')
    expect(table).toContainHTML('Fulfillment')
  })

  it('shows special columns for non enterprise business', () => {
    const opportunities = [
      {
        id: '1',
        type: 'SMBOpportunity',
        webResource: {
          url: ''
        }
      }
    ] as OpportunityFragment[]

    renderComponent(opportunities, false, false)

    expect(screen.getByTestId(TABLE)).toContainHTML('SMB')
  })

  it("don't show special columns for non enterprise business", () => {
    const opportunities = [
      {
        id: '1',
        status: OpportunityStatusType.ENDED,
        type: 'SMBOpportunity',
        webResource: {
          url: ''
        }
      }
    ] as OpportunityFragment[]

    renderComponent(opportunities, true, false)

    const table = screen.getByTestId(TABLE)

    expect(table).not.toContainHTML('SMB')
    expect(table).toContainHTML('Stage')
    expect(table).toContainHTML('Ended')
  })
})
