import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { commissionsRoleFragment } from '../../../../__fragments__/commissionsRoleFragment.graphql'

export default gql`
  mutation ResetRoleReferrer($input: ResetRoleReferrerInput!) {
    resetRoleReferrer(input: $input) {
      role {
        ... on Talent {
          id
          fullName
          referrer {
            ...CommissionsRole
          }
          ... on WebResource {
            webResource {
              ...WebResourceFragment
            }
          }
        }
        ... on TalentPartner {
          id
          fullName
          referrer {
            ...CommissionsRole
          }
          ... on WebResource {
            webResource {
              ...WebResourceFragment
            }
          }
        }
      }
      notice
      success
      errors {
        key
        message
        code
      }
    }
  }

  ${webResourceFragment}
  ${commissionsRoleFragment}
`
