import { gql } from '@apollo/client'
import { memorandumItem } from '@staff-portal/billing-widgets/src/modules/__fragments__/memorandumFragment.graphql'

export const memorandumListItemFragment = gql`
  fragment MemorandumListItemFragment on Memorandum {
    ...MemorandumItem
    createdOn
    receiver {
      __typename
      ... on Client {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on CompanyRepresentative {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Leader {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on ReferralPartner {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Staff {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Talent {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
      ... on TalentPartner {
        id
        fullName
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  ${memorandumItem}
`
