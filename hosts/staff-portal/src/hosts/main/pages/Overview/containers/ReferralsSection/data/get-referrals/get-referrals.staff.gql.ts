import { gql, useQuery, BATCH_KEY } from '@staff-portal/data-layer-service'

import { GetReferralsDocument } from './get-referrals.staff.gql.types'
import { DASHBOARD_GQL_BATCH_KEY } from '../../../../constants'
import { REFERRED_ROLE_EDGE_FRAGMENT } from '../referred-role-edge-fragment/referred-role-edge-fragment.staff.gql'

export default gql`
  query GetReferrals {
    widgets {
      referrals {
        referralSlug
        referralUrl
        companySourcingCommission {
          ... on FixedSourcingCommission {
            commission
          }
          ... on RelativeSourcingCommission {
            ratePercent
          }
        }
        talentSourcingCommission {
          ... on FixedSourcingCommission {
            commission
          }
          ... on RelativeSourcingCommission {
            ratePercent
          }
        }
        recentlyReferredRoles {
          hasMore
          edges {
            ...ReferredRoleEdgeFragment
          }
        }
      }
    }
  }

  ${REFERRED_ROLE_EDGE_FRAGMENT}
`

export const useGetReferrals = () => {
  const { data, ...restOptions } = useQuery(GetReferralsDocument, {
    context: { [BATCH_KEY]: DASHBOARD_GQL_BATCH_KEY }
  })

  return {
    data: data?.widgets?.referrals,
    ...restOptions
  }
}
