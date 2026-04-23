import { camelCase } from 'lodash-es'
import { ExpectedCommissionKind } from '@staff-portal/graphql/staff'

import {
  ExpectedCommissionFragment,
  ExpectedCommissionReasonFragment_Talent_
} from '../../../__fragments__/expectedCommissionFragment.graphql.types'

export const getLocaleKey = (
  expectedCommission: ExpectedCommissionFragment
) => {
  const { kind, reason } = expectedCommission
  const type = reason?.__typename

  const sourcedByTalentAcquisitionTeam = (
    reason as ExpectedCommissionReasonFragment_Talent_
  )?.sourcedByTalentAcquisitionTeam

  switch (kind) {
    case ExpectedCommissionKind.SOURCING_COMMISSION: {
      switch (type) {
        case 'Talent':
          return sourcedByTalentAcquisitionTeam
            ? 'sourcingCommission.talent.acquisition'
            : 'sourcingCommission.talent.default'

        case 'TalentPartner':
          return 'sourcingCommission.partner'

        case 'Client':
        default:
          return 'sourcingCommission.company'
      }
    }
    case ExpectedCommissionKind.TOP_SKILL_BONUS_TALENT_SOURCING_COMMISSION: {
      switch (type) {
        case 'Talent':
          return 'topSkillBonusTalentSourcingCommission.talent'

        case 'TalentPartner':
          return 'topSkillBonusTalentSourcingCommission.partner'

        case 'Client':
        default:
          return 'topSkillBonusTalentSourcingCommission.company'
      }
    }

    default:
      return camelCase(kind)
  }
}
