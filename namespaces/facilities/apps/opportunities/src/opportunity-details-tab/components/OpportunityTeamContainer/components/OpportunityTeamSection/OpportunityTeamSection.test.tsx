import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import OpportunityTeamSection from './OpportunityTeamSection'
import OpportunityTeamContent from '../OpportunityTeamContent'

jest.mock('../OpportunityTeamContent')

const opportunityTeamContentMock = OpportunityTeamContent as jest.Mock

const opportunityId = 'testOpportunityId'
const operations = {
  updateOpportunityClientPartner: createOperationMock(),
  updateOpportunityAccountManager: createOperationMock(),
  updateOpportunityProjectDeliveryManager: createOperationMock(),
  updateOpportunitySdr: createOperationMock(),
  updateOpportunityRelationshipManager: createOperationMock(),
  updateOpportunityProjectRelationshipManager: createOperationMock(),
  updateOpportunityProjectSalesSpecialist: createOperationMock(),
  updateOpportunitySalesClaimer: createOperationMock()
}

const getTeamFragment = () => ({
  id: opportunityId,
  operations
})

describe('Opportunity team section', () => {
  beforeEach(() => {
    opportunityTeamContentMock.mockReturnValue(null)
  })

  it('has opportunity', () => {
    const opportunity = getTeamFragment()

    render(
      <TestWrapper>
        <OpportunityTeamSection
          loading={false}
          initialLoading={false}
          opportunity={opportunity}
        />
      </TestWrapper>
    )

    expect(opportunityTeamContentMock).toHaveBeenCalledTimes(1)
  })

  it('has no opportunity', () => {
    render(
      <TestWrapper>
        <OpportunityTeamSection
          loading={false}
          initialLoading={false}
          opportunity={null}
        />
      </TestWrapper>
    )

    expect(opportunityTeamContentMock).not.toHaveBeenCalled()
  })
})
