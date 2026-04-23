import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyOpportunitiesSection, {
  Props
} from './CompanyOpportunitiesSection'
import CompanyOpportunitiesTable from '../CompanyOpportunitiesTable'
import { useGetCompanyOpportunities } from './data'
import { createGetCompanyOpportunitiesQueryMock } from './data/mocks'

jest.mock('../CompanyOpportunitiesTable', () => ({
  __esModule: true,
  default: jest.fn()
}))

const CompanyOpportunitiesTableMock = CompanyOpportunitiesTable as jest.Mock

jest.mock('./data/get-company-opportunities-data.staff.gql.ts')
const useGetOpportunitiesMock = useGetCompanyOpportunities as jest.Mock

const renderComponent = (props: Props) =>
  render(
    <TestWrapper>
      <CompanyOpportunitiesSection {...props} />
    </TestWrapper>
  )

describe('CompanyOpportunitiesSection', () => {
  beforeEach(() => {
    CompanyOpportunitiesTableMock.mockReturnValue(
      <div data-testid='opportunities-table-mock' />
    )
  })

  describe('when company has no children', () => {
    it('does not render "show subsidiary companies" checkbox', () => {
      const mockData = createGetCompanyOpportunitiesQueryMock()

      useGetOpportunitiesMock.mockReturnValue({ client: mockData.staffNode })

      renderComponent({ companyId: 'VjEtQ2xpZW50LTUyMDE3Ng==' })

      expect(
        screen.queryByRole('checkbox', { name: /show subsidiary companies/i })
      ).not.toBeInTheDocument()
    })
  })

  describe('when company has children', () => {
    it('renders "show subsidiary companies" checkbox', () => {
      const mockData = createGetCompanyOpportunitiesQueryMock({
        children: { totalCount: 1 }
      })

      useGetOpportunitiesMock.mockReturnValue({ client: mockData.staffNode })

      renderComponent({ companyId: 'VjEtQ2xpZW50LTUyMDE3Ng==' })

      expect(
        screen.getByRole('checkbox', { name: /show subsidiary companies/i })
      ).toBeInTheDocument()

      expect(
        screen.queryByTestId('CompanyOpportunitiesSection-addOpportunity')
      ).toBeInTheDocument()

      expect(
        screen.getByTestId('CompanyOpportunitiesSection-addOpportunity')
      ).toHaveAttribute(
        'href',
        'https://staging.toptal.net/platform/staff/clients/520176/opportunities/create'
      )
    })
  })

  describe('when access to the opportunities section is not authorized', () => {
    it('does not render the opportunities section', () => {
      const mockData = createGetCompanyOpportunitiesQueryMock()

      useGetOpportunitiesMock.mockReturnValue({
        client: mockData.staffNode,
        error: {
          graphQLErrors: [
            {
              message: 'Not authorized (Client.opportunities)',
              path: ['staffNode', 'opportunities'],
              extensions: {
                code: 'UNAUTHORIZED'
              }
            }
          ]
        }
      })

      renderComponent({ companyId: 'VjEtQ2xpZW50LTUyMDE3Ng==' })

      expect(
        screen.queryByTestId('company-opportunities-section')
      ).not.toBeInTheDocument()
    })
  })

  describe('when add new opportunity is disabled', () => {
    it('renders the "Add New Opportunity" button as disabled', () => {
      const mockData = createGetCompanyOpportunitiesQueryMock({
        createOpportunityUrl: {
          enabled: false,
          url: '',
          messages: ['add opportunity disabled message']
        }
      })

      useGetOpportunitiesMock.mockReturnValue({
        client: mockData.staffNode
      })

      renderComponent({ companyId: 'VjEtQ2xpZW50LTUyMDE3Ng==' })

      expect(
        screen.queryByTestId('CompanyOpportunitiesSection-addOpportunity')
      ).toHaveAttribute('aria-disabled', 'true')

      expect(
        screen.getByTestId('company-opportunities-section-actions')
      ).toHaveTextContent('add opportunity disabled message')
    })
  })

  describe('when add new opportunity is not authorized', () => {
    it('does not render the "Add New Opportunity" button', () => {
      const mockData = createGetCompanyOpportunitiesQueryMock({
        createOpportunityUrl: null
      })

      useGetOpportunitiesMock.mockReturnValue({
        client: mockData.staffNode
      })

      renderComponent({ companyId: 'VjEtQ2xpZW50LTUyMDE3Ng==' })

      expect(
        screen.queryByTestId('CompanyOpportunitiesSection-addOpportunity')
      ).not.toBeInTheDocument()
    })
  })
})
