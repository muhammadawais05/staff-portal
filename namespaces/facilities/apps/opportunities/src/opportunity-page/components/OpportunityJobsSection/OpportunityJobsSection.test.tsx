import React, { ComponentProps } from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import OpportunityJobsSection from '.'
import OpportunityJobsTable from '../OpportunityJobsTable'
import { useGetOpportunityJobs } from './data'

jest.mock('@staff-portal/data-layer-service')

jest.mock('../OpportunityJobsTable')
const opportunityJobsTableMock = OpportunityJobsTable as jest.Mock

jest.mock('./data/get-opportunity-jobs.staff.gql.ts')
const useGetOpportunityJobsMock = useGetOpportunityJobs as jest.Mock

const getOpportunityMock = (type: string) => {
  return {
    opportunity: {
      id: '1',
      type: type
    },
    jobs: [
      {
        id: '1',
        title: 'Senior Marketing Developer',
        lastAction: '2022-03-01T20:56:13+03:00',
        createdAt: '2022-02-03T21:17:27+03:00',
        talentPortalLink: {
          url: '',
          text: ''
        },
        committedRevenue: '$100.00'
      }
    ],
    loading: false,
    error: undefined
  }
}

const renderComponent = (
  props: ComponentProps<typeof OpportunityJobsSection>
) => {
  opportunityJobsTableMock.mockReturnValue(
    <div data-testid='opportunity-jobs-table' />
  )
  render(
    <TestWrapper>
      <OpportunityJobsSection {...props} />
    </TestWrapper>
  )
}

describe('OpportunityJobsSection', () => {
  beforeEach(() => {
    useGetOpportunityJobsMock.mockReturnValue(getOpportunityMock('Opportunity'))
  })

  it('renders OpportunityJobsTable', () => {
    renderComponent({ opportunityId: '1' })

    expect(screen.queryByTestId('opportunity-jobs-table')).toBeInTheDocument()
  })

  describe('when opportunity is a project opportunity', () => {
    beforeEach(() => {
      useGetOpportunityJobsMock.mockReturnValue(
        getOpportunityMock('Opportunity')
      )
    })

    it('renders OpportunityJobsTable component for project opportunity', () => {
      renderComponent({ opportunityId: '1' })

      expect(opportunityJobsTableMock).toHaveBeenCalledWith(
        expect.objectContaining({
          project: false
        }),
        expect.anything()
      )
    })
  })

  describe('when opportunity is not a project opportunity', () => {
    beforeEach(() => {
      useGetOpportunityJobsMock.mockReturnValue(
        getOpportunityMock('ProjectOpportunity')
      )
    })

    it('renders OpportunityJobsTable component for non project opportunity', () => {
      renderComponent({ opportunityId: '1' })

      expect(opportunityJobsTableMock).toHaveBeenCalledWith(
        expect.objectContaining({
          project: true
        }),
        expect.anything()
      )
    })
  })
})
