import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetAccountManagerDocument } from '../data'

export const getAccountManagerHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetAccountManagerDocument,
    data => data?.node?.accountManager?.id
  )
