import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

export const staffFragment = gql`
  fragment StaffFragment on Staff {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }

  ${webResourceFragment}
`
