import { getOpportunityDataHook } from './get-opportunity-data-hook'
import { GetProjectSalesSpecialistDocument } from '../data'

export const getProjectSalesSpecialistHook = (opportunityId: string) =>
  getOpportunityDataHook(
    { opportunityId },
    GetProjectSalesSpecialistDocument,
    data => data?.node?.projectSalesSpecialist?.id
  )
