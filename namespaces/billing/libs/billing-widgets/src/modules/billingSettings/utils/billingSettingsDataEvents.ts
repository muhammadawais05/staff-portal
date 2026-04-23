import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'

export const purchaseOrderUpdateDataEvents = [
  ApolloContextEvents.jobPurchaseOrderEdit,
  ApolloContextEvents.jobNextPurchaseOrderEdit
]

export const billingSettingsDataEvents = [
  ...purchaseOrderUpdateDataEvents,
  ApolloContextEvents.jobInvoiceNoteUpdate
]
