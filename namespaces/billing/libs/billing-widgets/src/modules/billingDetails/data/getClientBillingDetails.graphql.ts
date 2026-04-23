import { gql } from '@apollo/client'
import { webResourceFragment } from '@staff-portal/billing/src/__fragments__/webResourceFragment.graphql'

import { billingOptionFragment } from '../../__fragments__/billingOptionFragment.graphql'
import { jobTemplateFragment } from '../../__fragments__/jobTemplateFragment.graphql'

export default gql`
  query GetClientBillingDetails($clientId: ID!) {
    node(id: $clientId) {
      ... on Client {
        id
        # Required for the "company_ids" badge on Invoice page
        _companyId
        # If data does not work directly with the company and only uses an ID, error will happen.
        # Workaround is to add "fullName" to the query.
        fullName
        # ##
        invoices(
          filter: { statuses: [] }
          pagination: { offset: 0, limit: 1 }
        ) {
          totalCount
        }
        billingAddress
        billingName
        billingCity
        billingZip
        billingState
        billingCountry {
          name
        }
        billingPhone
        billingNotes
        billingOptions(filter: { scope: ALL }) {
          nodes {
            ...ClientBillingDetailsBillingOptions
          }
        }
        netTerms
        enterprise
        collectionSpeed
        notifyAboutNewInvoices
        autoAllocateMemos
        attachTimesheetsToInvoices
        investmentGrade
        commitmentSettings {
          minimumHours
        }
        jobTemplate {
          ...JobTemplateFragment
        }
        operations {
          updateBillingNotes {
            ...OperationItem
          }
          updateClientAttachTimesheetsToInvoices {
            ...OperationItem
          }
          updateClientAutoAllocateMemos {
            ...OperationItem
          }
          updateClientBillingAddress {
            ...OperationItem
          }
          updateClientCommitment {
            ...OperationItem
          }
          updateClientNetTerms {
            ...OperationItem
          }
          updateClientCollectionSpeed {
            ...OperationItem
          }
          updateClientNotifyAboutNewInvoices {
            ...OperationItem
          }
          updateClientInvestmentGrade {
            ...OperationItem
          }
          downloadClientBillingReport {
            ...OperationItem
          }
          createJobTemplate {
            ...OperationItem
          }
        }
      }
    }

    viewer {
      permits {
        canManageBillingOptions
      }
    }
  }

  ${webResourceFragment}
  ${billingOptionFragment}
  ${jobTemplateFragment}

  fragment ClientBillingDetailsBillingOptions on BillingOptionInterface {
    ...BillingOptionFragment
    isLastPullMethod
  }
`
