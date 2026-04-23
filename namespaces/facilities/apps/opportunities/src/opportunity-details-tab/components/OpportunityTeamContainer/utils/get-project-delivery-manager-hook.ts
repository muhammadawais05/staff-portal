import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetProjectDeliveryManagerDocument } from '../data'

export const getProjectDeliveryManagerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetProjectDeliveryManagerDocument,
    data => data?.node?.projectDeliveryManager?.id
  )
