import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetSdrDocument } from '../data'

export const getSdrHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetSdrDocument,
    data => data?.node?.sdr?.id
  )
