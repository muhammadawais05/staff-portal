import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import LinkedCompaniesTable from './LinkedCompaniesTable'
import { LinkedCompanyNodeFragment } from '../LinkedCompaniesSection/data'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Typography: () => <div data-testid='linked-companies-loader' />
  }
}))

const companies = [
  {
    id: '1',
    badLead: false,
    fullName: 'Test 1',
    cumulativeStatus: ClientCumulativeStatus.ACTIVE,
    webResource: {
      url: ''
    }
  },
  {
    id: '2',
    badLead: true,
    fullName: 'Test 2',
    cumulativeStatus: ClientCumulativeStatus.ACTIVE,
    webResource: {
      url: ''
    }
  },
  {
    id: '3',
    badLead: true,
    fullName: 'Test 3',
    cumulativeStatus: ClientCumulativeStatus.ACTIVE,
    webResource: {
      url: ''
    }
  }
] as LinkedCompanyNodeFragment[]

const TABLE = 'items-table'

interface Props {
  data: LinkedCompanyNodeFragment[]
  loading: boolean
  showBadLeads?: boolean
}

const renderComponent = ({ data, loading, showBadLeads = false }: Props) =>
  render(
    <TestWrapper>
      <LinkedCompaniesTable
        data={data}
        loading={loading}
        showBadLeads={showBadLeads}
      />
    </TestWrapper>
  )

describe('LinkedCompaniesTable', () => {
  it('shows loader when loading', () => {
    renderComponent({ data: [], loading: true })

    expect(screen.getByTestId('linked-companies-loader')).toBeInTheDocument()
  })

  it('shows empty message when no data', () => {
    renderComponent({ data: [], loading: false })

    expect(
      screen.getByTestId('linked-companies-empty-message').textContent
    ).toBe('No subsidiary companies.')
  })

  it('shows table with rows for the all companies', () => {
    renderComponent({ data: companies, loading: false, showBadLeads: true })

    expect(screen.getByTestId(TABLE)).toContainHTML('Test 1')
    expect(screen.getByTestId(TABLE)).toContainHTML('Test 2')
    expect(screen.getByTestId(TABLE)).toContainHTML('Test 3')
  })

  it('shows table without rows for bad lead companies', () => {
    renderComponent({ data: companies, loading: false, showBadLeads: false })

    expect(screen.getByTestId(TABLE)).toContainHTML('Test 1')
    expect(screen.getByTestId(TABLE)).not.toContainHTML('Test 2')
    expect(screen.getByTestId(TABLE)).not.toContainHTML('Test 3')
  })
})
