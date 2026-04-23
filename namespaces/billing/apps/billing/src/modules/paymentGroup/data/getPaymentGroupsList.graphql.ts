import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

export default gql`
  query GetPaymentGroupsList(
    $pagination: OffsetPagination!
    $filter: PaymentGroupsFilter!
  ) {
    paymentGroupsNullable(filter: $filter, pagination: $pagination) {
      totalCount
      nodes {
        ...PaymentGroupItem
      }
    }
  }

  fragment PaymentGroupItem on PaymentGroup {
    amount
    createdOn
    id
    number
    status
    operations {
      payPaymentGroup {
        ...OperationItem
      }
    }
    subject {
      ... on Client {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on CompanyRepresentative {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Leader {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on ReferralPartner {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Talent {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on TalentPartner {
        id
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Staff {
        id
        webResource {
          ...WebResourceFragment
        }
      }
    }
    webResource {
      ...WebResourceFragment
    }
    historyLink {
      url
    }
  }

  ${operationItemFragment}
  ${webResourceFragment}
`
