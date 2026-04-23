import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { roleItemFragment } from './roleFragment.graphql'

export const noteCommonFragment = gql`
  fragment NoteCommon on Note {
    comment
    createdAt
    creator {
      ...RoleItem
      ... on Client {
        fullName
        id
        email
      }
      ... on WebResource {
        webResource {
          ...WebResourceFragment
        }
      }
    }
    id
    newSalesCall
    checklistSalesCall
    operations {
      removeNote {
        ...OperationItem
      }
      removeNoteAttachment {
        ...OperationItem
      }
      updateNote {
        ...OperationItem
      }
    }
    screeningCall
    title
    updatedAt
  }

  ${roleItemFragment}
  ${operationItemFragment}
`
