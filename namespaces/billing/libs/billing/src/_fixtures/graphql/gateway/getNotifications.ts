import {
  EmailDeliveryStatus,
  InvoiceNotificationUnsentReason
} from '@staff-portal/graphql/staff'

export default {
  monitoringStartDate: '2020-03-27',
  notificationSentAt: '2015-10-12T09:30:27+03:00',
  notifications: {
    __typename: 'InvoiceNotificationsStatusesConnection',
    nodes: [
      {
        __typename: 'InvoiceNotificationStatus',
        description: 'Example delivered description',
        email: 'anas-d7d4bb79a8c79b88@toptal.io',
        status: EmailDeliveryStatus.DELIVERED
      },
      {
        __typename: 'InvoiceNotificationStatus',
        description: 'Example dropped description',
        email: 'flor-29426245abd6f743@toptal.io',
        status: EmailDeliveryStatus.DROPPED
      },
      {
        __typename: 'InvoiceNotificationStatus',
        description: 'Example missing description',
        email: 'luka-bcaf9a8c901db6a4@toptal.io',
        status: EmailDeliveryStatus.MISSING
      }
    ],
    sentAt: null,
    unsentReasonKey: InvoiceNotificationUnsentReason.CONSOLIDATED_INVOICE
  }
}
