import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { memorandumCategoryCommon } from '../../../../__fragments__/memorandumCategoryCommon.graphql'
import { memorandumItem } from '../../../../__fragments__/memorandumFragment.graphql'

export default gql`
  query GetPaymentTaskCard($paymentId: ID!) {
    node(id: $paymentId) {
      ... on Payment {
        id
        status
        amount
        balanceDue
        createdOn
        description
        dueDate
        documentNumber
        paymentKind
        memorandumCategories {
          nodes {
            ...MemorandumCategoryCommon
          }
        }
        memorandums {
          nodes {
            ...MemorandumItem
          }
        }
        operations {
          addMemorandumToCommercialDocument {
            ...OperationItem
          }
        }
        subjectObject {
          ... on Staff {
            ...GetPaymentTaskCardSubjectObjectStaff
          }
          ... on Talent {
            ...GetPaymentTaskCardSubjectObjectTalent
          }
        }
        job {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        client {
          id
          webResource {
            ...WebResourceFragment
          }
        }
        paymentMethod
        paymentGroup {
          id
          number
          webResource {
            ...WebResourceFragment
          }
        }
        webResource {
          ...WebResourceFragment
        }
      }
    }
  }

  fragment GetPaymentTaskCardSubjectObjectStaff on Staff {
    id
    fullName
    webResource {
      ...WebResourceFragment
    }
  }
  fragment GetPaymentTaskCardSubjectObjectTalent on Talent {
    id
    fullName
    activePaymentHold {
      amountThreshold
      dateThreshold
      creationReason
    }
    webResource {
      ...WebResourceFragment
    }
  }

  ${memorandumCategoryCommon}
  ${memorandumItem}
  ${operationItemFragment}
  ${webResourceFragment}
`
