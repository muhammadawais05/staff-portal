import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { roleItemFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/roleFragment.graphql'
import { noteCommonFragment } from '@staff-portal/billing-widgets/src/modules/__fragments__/noteCommonFragment.graphql'

export const noteItemFragment = gql`
  fragment NoteItem on Note {
    ...NoteCommon
    answers {
      nodes {
        comment
        question {
          kind
          label
        }
        value
      }
    }
    attachment {
      identifier
      url
      webResource {
        ...WebResourceFragment
      }
    }
  }

  ${roleItemFragment}
  ${operationItemFragment}
  ${noteCommonFragment}
  ${webResourceFragment}
`
