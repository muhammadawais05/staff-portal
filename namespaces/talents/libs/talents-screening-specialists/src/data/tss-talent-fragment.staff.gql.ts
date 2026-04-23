import { gql } from '@staff-portal/data-layer-service'
import { ROLE_FLAG_FRAGMENT } from '@staff-portal/role-flags'
import { TALENT_PARTNER_FRAGMENT } from '@staff-portal/talents'

import { TSS_TALENT_OPERATIONS_FRAGMENT } from './tss-talent-operations-fragment.staff.gql'

export const TSS_TALENT_FRAGMENT = gql`
  fragment TssTalentFragment on Talent {
    id
    fullName
    cumulativeStatus
    detailedStatus
    talentType
    screeningRank
    photo {
      thumb
    }
    roleFlags {
      nodes {
        ...RoleFlagFragment
      }
    }
    webResource {
      url
    }
    specializationApplications(filter: { statuses: [PENDING] }) {
      nodes {
        id
        specialization {
          id
          title
        }
      }
    }
    operations {
      ...TssTalentOperationsFragment
    }
    ...TalentPartnerFragment
  }
  ${TSS_TALENT_OPERATIONS_FRAGMENT}
  ${ROLE_FLAG_FRAGMENT}
  ${TALENT_PARTNER_FRAGMENT}
`
