import { ClientCumulativeStatus } from '@staff-portal/graphql/staff'

import { CompanyStatusTextMapping } from '../../../../types'

export const getClientStatusText = (
  status: ClientCumulativeStatus,
  companyStatusTextMapping: CompanyStatusTextMapping | undefined
) => (companyStatusTextMapping ? companyStatusTextMapping[status] : status)
