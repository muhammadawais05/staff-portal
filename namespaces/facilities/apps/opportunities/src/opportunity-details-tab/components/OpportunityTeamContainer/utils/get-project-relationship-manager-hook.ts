import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetProjectRelationshipManagerDocument } from '../data'

export const getProjectRelationshipManagerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetProjectRelationshipManagerDocument,
    data => data?.node?.projectRelationshipManager?.id
  )
