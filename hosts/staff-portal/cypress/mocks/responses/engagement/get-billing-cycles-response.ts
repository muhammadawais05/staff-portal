import { Engagement } from '@staff-portal/graphql/staff'

import { getEngagementMock } from '~integration/mocks/fragments'

export const getBillingCyclesResponse = (engagement?: Partial<Engagement>) => ({
  data: {
    node: getEngagementMock(engagement),
    engagementDocuments: {
      invoices: [],
      payments: [],
      commissions: [],
      __typename: 'BillingEngagementDocuments'
    }
  }
})
