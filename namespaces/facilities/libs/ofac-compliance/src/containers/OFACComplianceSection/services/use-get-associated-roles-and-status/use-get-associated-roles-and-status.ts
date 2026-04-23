import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useDependency } from '@staff-portal/dependency-injector'
import { Maybe } from '@toptal/picasso/utils'

import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '../../../../dependencies'
import {
  OfacStatusData,
  OfacStatusDataClientFragment,
  OfacStatusDataTalentFragment,
  OfacStatusDataCompanyRepresentativeFragment
} from '../../data/get-ofac-status-data'
import { getClientStatusText } from '../get-client-status-text/get-client-status-text'
import { getRoleStatusText } from '../get-role-status-text/get-role-status-text'
import { getTalentStatusText } from '../get-talent-status-text/get-talent-status-text'

const isOfacStatusDataTalentFragment = (
  data: OfacStatusData
): data is OfacStatusDataTalentFragment =>
  decodeEntityId(data.id).type === 'Talent'

const isOfacStatusDataClientFragment = (
  data: OfacStatusData
): data is OfacStatusDataClientFragment =>
  decodeEntityId(data.id).type === 'Client'

const isOfacStatusDataCompanyRepresentativeFragment = (
  data: OfacStatusData
): data is OfacStatusDataCompanyRepresentativeFragment =>
  decodeEntityId(data.id).type === 'CompanyRepresentative'

export const useGetAssociatedRolesAndStatus = (data: Maybe<OfacStatusData>) => {
  const companyStatusTextMapping = useDependency(
    COMPANY_STATUS_TEXT_MAPPING_DI_KEY
  )
  const talentStatusMapping = useDependency(TALENT_STATUS_MAPPING_DI_KEY)

  if (!data) {
    return {
      roleOrClientStatus: null,
      associatedRoles: null
    }
  }

  if (isOfacStatusDataTalentFragment(data)) {
    return {
      roleOrClientStatus: data?.talentCumulativeStatus
        ? getTalentStatusText(data.talentCumulativeStatus, talentStatusMapping)
        : null,
      associatedRoles: data.talentAssociatedRoles?.nodes
    }
  }

  if (isOfacStatusDataClientFragment(data)) {
    return {
      roleOrClientStatus: data.clientCumulativeStatus
        ? getClientStatusText(
            data.clientCumulativeStatus,
            companyStatusTextMapping
          )
        : null,
      associatedRoles: data.clientAssociatedRoles?.nodes
    }
  }

  if (isOfacStatusDataCompanyRepresentativeFragment(data)) {
    return {
      roleOrClientStatus: data.cumulativeStatus
        ? getRoleStatusText(data.cumulativeStatus)
        : null,
      associatedRoles: data.associatedRoles?.nodes
    }
  }

  return {
    roleOrClientStatus: data.staffCumulativeStatus
      ? getRoleStatusText(data.staffCumulativeStatus)
      : null,
    associatedRoles: data.staffAssociatedRoles?.nodes
  }
}
