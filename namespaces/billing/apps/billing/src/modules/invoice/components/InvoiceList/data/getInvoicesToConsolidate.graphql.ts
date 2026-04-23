import { gql } from '@apollo/client'

export default gql`
  query GetInvoicesToConsolidate($clientId: ID!, $filter: InvoicesFilter!) {
    invoices(pagination: { limit: 1000, offset: 0 }, filter: $filter) {
      downloadXlsxUrl
      groups {
        invoices {
          ...ConsolidatableInvoiceItem
          consolidatable
        }
      }
    }

    availableBillingTerms: node(id: $clientId) {
      ... on Client {
        id
        netTerms
        availableNetTerms
      }
    }
  }

  fragment ConsolidatableInvoiceItem on Invoice {
    relatedTasks(
      filter: { playbook: "issue_memo_for_invoice" }
      pagination: { offset: 0, limit: 10 }
    ) {
      nodes {
        status
      }
    }
    ...InvoiceToConsolidateListItemFragment
  }
`
