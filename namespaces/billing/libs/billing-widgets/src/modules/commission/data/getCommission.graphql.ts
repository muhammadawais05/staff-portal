import gql from 'graphql-tag'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { commissionsRoleFragment } from '../../__fragments__/commissionsRoleFragment.graphql'

export default gql`
  query GetCommission($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Talent {
        ...TalentCommission
      }

      ... on Client {
        ...ClientCommission
      }
    }
  }

  fragment TalentCommission on Talent {
    id
    commissions {
      commissionsPot
      referralCommission: referralCommissionV2 {
        ... on FixedSourcingCommission {
          commission
        }
        ... on RelativeSourcingCommission {
          ratePercent
        }
      }
    }
    canIssueSourcingCommission
    referrer {
      ...CommissionsRole
    }
  }

  fragment ClientCommission on Client {
    id
    commissions {
      commissionsPot
      referralCommission: referralCommissionV2 {
        ... on FixedSourcingCommission {
          commission
        }
        ... on RelativeSourcingCommission {
          ratePercent
        }
      }
    }
    canIssueSourcingCommission
    referrer {
      ...CommissionsRole
    }
    claimer {
      ...CommissionsRole
    }
    commissionReceiver {
      ... on Role {
        id
        fullName
      }
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    operations {
      changeRoleReferrer {
        ...OperationItem
      }
      updateClientClaimer {
        ...OperationItem
      }
    }
  }

  ${commissionsRoleFragment}
  ${webResourceFragment}
  ${operationItemFragment}
`
