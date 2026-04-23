import React from 'react'
import { render } from '@testing-library/react'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import OpportunityTeamContent from './OpportunityTeamContent'
import EnterpriseOpportunityInternalTeamContent from '../EnterpriseOpportunityInternalTeamContent'
import ProjectOpportunityInternalTeamContent from '../ProjectOpportunityInternalTeamContent'

jest.mock('../EnterpriseOpportunityInternalTeamContent')
jest.mock('../ProjectOpportunityInternalTeamContent')
const enterpriseOpportunityInternalTeamContentMock =
  EnterpriseOpportunityInternalTeamContent as jest.Mock
const projectOpportunityInternalTeamContentMock =
  ProjectOpportunityInternalTeamContent as jest.Mock

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

interface Props {
  enterprise: boolean
}
const getTeamFragment = ({ enterprise }: Props) => ({
  id: opportunityId,
  operations,
  enterprise
})

describe('Opportunity team content', () => {
  beforeEach(() => {
    enterpriseOpportunityInternalTeamContentMock.mockReturnValue(
      <div>Enterprise</div>
    )
    projectOpportunityInternalTeamContentMock.mockReturnValue(
      <div>Project</div>
    )
  })

  it('has enterprise type', () => {
    const opportunity = getTeamFragment({ enterprise: true })

    render(<OpportunityTeamContent opportunity={opportunity} />)

    expect(enterpriseOpportunityInternalTeamContentMock).toHaveBeenCalledTimes(
      1
    )
    expect(projectOpportunityInternalTeamContentMock).not.toHaveBeenCalled()
    expect(enterpriseOpportunityInternalTeamContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        opportunity
      }),
      {}
    )
  })

  it('has project type', () => {
    const opportunity = getTeamFragment({ enterprise: false })

    render(<OpportunityTeamContent opportunity={opportunity} />)

    expect(projectOpportunityInternalTeamContentMock).toHaveBeenCalledTimes(1)
    expect(enterpriseOpportunityInternalTeamContentMock).not.toHaveBeenCalled()
    expect(projectOpportunityInternalTeamContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        opportunity
      }),
      {}
    )
  })
})
