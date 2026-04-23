import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import { EngagementClientFragment } from './data/get-engagement-client'
import { useGetEngagementClient } from './data'
import EngagementCompany from './EngagementCompany'

jest.mock('./data')

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  SkypeLink: () => <span />,
  PhoneLink: () => <span />
}))

const mockReturnValues = ({
  loading = false,
  data
}: Partial<{
  loading?: boolean
  data?: Partial<EngagementClientFragment>
}> = {}) => {
  const mockUseGetEngagementClient = useGetEngagementClient as jest.Mock

  mockUseGetEngagementClient.mockReturnValue({
    loading,
    data
  })
}

const renderCommponent = () =>
  render(
    <TestWrapper>
      <EngagementCompany engagementId='1' />
    </TestWrapper>
  )

describe('Engagement Company section', () => {
  describe('while the section data is being loaded', () => {
    it('shows the skeleton loader', () => {
      mockReturnValues({
        loading: true,
        data: {
          id: '1',
          fullName: 'Company Name',
          email: 'company@company.test',
          webResource: { text: 'Company Name' },
          contact: { id: '1', contacts: { nodes: [] } }
        }
      })
      renderCommponent()

      expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
    })
  })

  describe('when the engagement data is missing', () => {
    it('does not return anything', () => {
      mockReturnValues({ loading: false, data: undefined })
      renderCommponent()

      expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('engagement-company-badge')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('engagement-company-detailed-list-items')
      ).not.toBeInTheDocument()
    })
  })

  it('shows the company badge', () => {
    mockReturnValues({
      loading: false,
      data: {
        id: '1',
        fullName: 'Company Name',
        email: 'company@company.test',
        webResource: { text: 'Company Name' },
        contact: { id: '1', contacts: { nodes: [] } }
      }
    })
    renderCommponent()

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(screen.getByText('Company Name')).toBeInTheDocument()
  })
})
