import { Opportunity } from '@staff-portal/graphql/staff'

import { OperationValue } from '~integration/types'
import {
  getOpportunityResponse,
  getOpportunityJobsResponse,
  getPendoVisitorResponse,
  getOpportunityTeamResponse
} from '~integration/mocks/responses'

export const opportunityPageStubs = (
  opportunity?: Partial<Opportunity>
): {
  [key: string]: OperationValue
} => ({
  GetOpportunity: getOpportunityResponse(opportunity),
  GetOpportunityDetails: getOpportunityResponse(opportunity),
  GetOpportunityJobs: getOpportunityJobsResponse(opportunity),
  GetOpportunityTeam: getOpportunityTeamResponse(opportunity),
  GetPendoVisitor: getPendoVisitorResponse()
})
