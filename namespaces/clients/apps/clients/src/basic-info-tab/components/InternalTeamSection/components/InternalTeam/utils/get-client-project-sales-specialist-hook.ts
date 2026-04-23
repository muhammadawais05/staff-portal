import { getClientDataHook } from '@staff-portal/clients'

import { GetClientProjectSalesSpecialistDocument } from '../data'

export const getClientProjectSalesSpecialistHook = (clientId: string) =>
  getClientDataHook(
    { clientId },
    GetClientProjectSalesSpecialistDocument,
    data => data?.node?.projectSalesSpecialist?.id
  )
