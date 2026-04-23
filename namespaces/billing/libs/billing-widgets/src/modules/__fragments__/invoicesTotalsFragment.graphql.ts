import { gql } from '@apollo/client'

export const invoicesTotalsFragment = gql`
  fragment InvoicesTotalsFragment on InvoicesTotals {
    credited
    disputed
    paid
    outstanding
    overdue
    pendingReceipt
    inCollections
    writtenOff
    draft
  }
`
