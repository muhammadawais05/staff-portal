import { gql } from '@staff-portal/data-layer-service'
import {
  ROLE_OR_CLIENT_FRAGMENT,
  WEB_RESOURCE_FRAGMENT
} from '@staff-portal/facilities'

export const GET_JOB_COMMISSIONS = gql`
  query JobCommissions($jobId: ID!) {
    viewer {
      permits {
        canViewJobCommissions
      }
    }
    node(id: $jobId) {
      ... on Job {
        id
        client {
          id
          ...ClientCommissionFragment
        }
        engagements(filter: { scope: CURRENT }) {
          nodes {
            id
            talent {
              id
              type
              ...TalentCommissionFragment
              talentPartner {
                ...TalentPartnerCommissionFragment
              }
            }
            commissions {
              commissionsPot
              commissions {
                ...EngagementCommissionFragment
              }
            }
          }
        }
      }
    }
  }

  fragment ClientCommissionFragment on Client {
    id
    commissions {
      commissionsPot
      referralCommissionV2 {
        ...SourcingCommissionFragment
      }
    }
    referrer {
      ...RoleOrClientFragment
    }
  }

  fragment TalentCommissionFragment on Talent {
    id
    commissions {
      commissionsPot
      referralCommissionV2 {
        ...SourcingCommissionFragment
      }
    }
    referrer {
      ...RoleOrClientFragment
    }
  }

  fragment TalentPartnerCommissionFragment on TalentPartner {
    id
    commissions {
      commissionsPot
      referralCommission {
        ...SourcingCommissionFragment
      }
    }
    referrer {
      ...RoleOrClientFragment
    }
  }

  fragment EngagementCommissionFragment on EngagementCommission {
    name
    value
    subject {
      id
      ...WebResourceFragment
    }
  }

  fragment SourcingCommissionFragment on SourcingCommission {
    __typename
    ... on FixedSourcingCommission {
      commission
    }
    ... on RelativeSourcingCommission {
      ratePercent
    }
  }

  ${WEB_RESOURCE_FRAGMENT}
  ${ROLE_OR_CLIENT_FRAGMENT}
`
