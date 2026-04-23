import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'
import { memorandumOperationsFragment } from '@staff-portal/billing/src/__fragments__/memorandumOperationsFragment.graphql'

export const memorandumBaseItem = gql`
  fragment MemorandumBaseItem on Memorandum {
    allocated
    allocatedAt
    amount
    amountDue
    balance
    category {
      credit
      debit
      id
      name
    }
    depositCorrection
    description
    document {
      id
      documentNumber
      ... on Payment {
        webResource {
          ...WebResourceFragment
        }
      }
      ... on Invoice {
        invoiceKind
        subjectObject {
          fullName
          id
        }
        webResource {
          ...WebResourceFragment
        }
      }
    }
    downloadHtmlUrl
    downloadPdfUrl
    id
    number
    ...MemorandumOperationsFragment
  }

  ${memorandumOperationsFragment}
  ${operationItemFragment}
  ${webResourceFragment}
`
