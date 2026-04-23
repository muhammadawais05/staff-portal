import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetRelationshipManagerDocument } from '../data'

export const getRelationshipManagerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetRelationshipManagerDocument,
    data => data?.node?.relationshipManager?.id
  )
