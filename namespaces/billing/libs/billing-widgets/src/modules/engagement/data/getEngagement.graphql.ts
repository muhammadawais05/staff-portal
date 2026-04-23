import { gql } from '@apollo/client'
import { operationItemFragment } from '@staff-portal/billing/src/__fragments__/operationItemFragment.graphql'

import { purchaseOrderFragment } from '../../__fragments__/purchaseOrderFragment.graphql'

// TODO:
// Extend to a full scale engagement
export default gql`
  query GetEngagement($engagementId: ID!) {
    node(id: $engagementId) {
      ... on Engagement {
        billCycle
        billDay
        id
        commitment
        canBeDiscounted
        companyFullTimeRate
        companyHourlyRate
        companyPartTimeRate
        extraHoursEnabled
        defaultFullTimeDiscount
        defaultMarkup
        defaultPartTimeDiscount
        defaultUpcharge
        discountMultiplier
        fullTimeDiscount
        markup
        partTimeDiscount
        rateMethod
        rateOverrideReason
        talentFullTimeRate
        talentHourlyRate
        talentPartTimeRate
        talent {
          id
          fullName
        }
        job {
          autoConsolidationEnabled
          title
          id
          jobType
          client {
            fullName
            contact {
              fullName
              id
            }
            enterprise
            id
            netTerms
            # Temporary rename
            # https://github.com/toptal/platform/pull/45426/files
            purchaseOrders: purchaseOrdersNullable(
              filter: { assignable: true }
            ) {
              nodes {
                ...PurchaseOrderFragment
                purchaseOrderLines(filter: { assignable: true }) {
                  nodes {
                    id
                    poLineNumber
                  }
                }
              }
            }
          }
        }
        semiMonthlyPaymentTalentAgreement
        operations {
          changeProductBillingFrequency {
            ...OperationItem
          }
          changeEngagementCommitment {
            ...OperationItem
          }
        }
      }
    }
  }

  ${operationItemFragment}
  ${purchaseOrderFragment}
`
