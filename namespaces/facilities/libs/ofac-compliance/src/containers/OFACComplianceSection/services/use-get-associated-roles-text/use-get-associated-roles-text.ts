import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useDependency } from '@staff-portal/dependency-injector'
import { Maybe } from '@toptal/picasso/utils'

import { getClientStatusText, getRoleStatusText, getTalentStatusText } from '..'
import {
  COMPANY_STATUS_TEXT_MAPPING_DI_KEY,
  TALENT_STATUS_MAPPING_DI_KEY
} from '../../../../dependencies'
import { AssociatedRole } from '../../../../types'
import {
  AssociatedClientFragment,
  AssociatedCompanyRepresentativeFragment,
  AssociatedTalentFragment
} from '../../data/get-ofac-status-data'

export const useGetAssociatedRolesText = (
  associatedRoles: Maybe<AssociatedRole[]>
) => {
  const companyStatusTextMapping = useDependency(
    COMPANY_STATUS_TEXT_MAPPING_DI_KEY
  )
  const talentStatusMapping = useDependency(TALENT_STATUS_MAPPING_DI_KEY)

  return associatedRoles
    ?.map(associatedRole => {
      const type = decodeEntityId(associatedRole.id).type

      if (type === 'Client') {
        const status = (associatedRole as AssociatedClientFragment)
          .clientCumulativeStatus

        return `Client${
          status
            ? ` - ${getClientStatusText(status, companyStatusTextMapping)}`
            : ''
        }`
      }

      if (type === 'Talent') {
        return `Talent - ${getTalentStatusText(
          (associatedRole as AssociatedTalentFragment).talentCumulativeStatus,
          talentStatusMapping
        )}`
      }

      if (type === 'CompanyRepresentative') {
        const status = (
          associatedRole as AssociatedCompanyRepresentativeFragment
        ).companyRepresentativeCumulativeStatus

        return `Company Representative${
          status ? ` - ${getRoleStatusText(status)}` : ''
        }`
      }

      return `${decodeEntityId(associatedRole.id).type} - ${getRoleStatusText(
        (
          associatedRole as Exclude<
            AssociatedRole,
            | Pick<AssociatedClientFragment, 'clientCumulativeStatus'>
            | AssociatedCompanyRepresentativeFragment
            | AssociatedTalentFragment
          >
        ).cumulativeStatus
      )}`
    })
    .join(', ')
}
