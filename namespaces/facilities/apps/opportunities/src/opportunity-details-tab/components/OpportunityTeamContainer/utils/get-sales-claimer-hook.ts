import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetSalesClaimerDocument } from '../data'

export const getSalesClaimerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetSalesClaimerDocument,
    data => data?.node?.salesClaimer?.id
  )
