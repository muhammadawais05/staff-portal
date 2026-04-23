import { getClientDataHook } from '@staff-portal/clients'

import { GetClientCountAsLeadDocument } from '../data/get-client-count-as-lead.staff.gql.types'

export const getClientCountAsLeadHook = (clientId: string) =>
  getClientDataHook({ clientId }, GetClientCountAsLeadDocument, data =>
    Number(data?.node?.countAsLead)
  )
