import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { noteItemFragment } from '../../__fragments__/noteItemFragment.graphql'

export default gql`
  query GetNotes($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Invoice {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on Payment {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on PurchaseOrder {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
      ... on PurchaseOrderLine {
        id
        notes(order: { direction: ASC, field: UPDATED_AT }) {
          ...CommercialDocumentNotes
        }
      }
    }
  }

  fragment CommercialDocumentNotes on NoteConnection {
    nodes {
      ...NoteItem
    }
    operations {
      createNote {
        ...OperationItem
      }
    }
  }

  ${noteItemFragment}
  ${operationItemFragment}
`
