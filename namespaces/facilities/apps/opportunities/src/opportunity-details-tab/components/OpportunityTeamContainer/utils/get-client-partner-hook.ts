import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetClientPartnerDocument } from '../data'

export const getClientPartnerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetClientPartnerDocument,
    data => data?.node?.clientPartner?.id
  )
