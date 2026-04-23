import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetJobQuery } from './getJob.graphql.types'
import { useGetJobHeaderQuery } from './getJobHeader.graphql.types'
import { useGetEngagementDetailsQuery } from './getEngagementDetails.graphql.types'
import { useGetPurchaseOrdersOptionsQuery } from './getPurchaseOrdersOptions.graphql.types'

export const useGetJob = (jobId: string) =>
  useGetNode(useGetJobQuery)({ jobId })

export const useGetPurchaseOrdersOptions = (
  jobId: string,
  include: string[],
  exclude: string[]
) => useGetNode(useGetPurchaseOrdersOptionsQuery)({ jobId, include, exclude })

export const useGetEngagementDetails = (jobId: string) =>
  useGetNode(useGetEngagementDetailsQuery)({ jobId })

// TODO: Remove after https://toptal-core.atlassian.net/browse/SPC-1267 is complete
export const useGetJobHeader = (jobId: string) =>
  useGetNode(useGetJobHeaderQuery)({ jobId })

export { useEditJobInvoiceNoteMutation } from './editJobInvoiceNote.graphql.types'
export { useAssignJobPurchaseOrderMutation } from './assignJobPurchaseOrder.graphql.types'
export { useAssignJobPurchaseOrderLineMutation } from './assignJobPurchaseOrderLine.graphql.types'
export { useAssignJobNextPurchaseOrderMutation } from './assignJobNextPurchaseOrder.graphql.types'
export { useAssignJobNextPurchaseOrderLineMutation } from './assignJobNextPurchaseOrderLine.graphql.types'
export { useUpdateJobAttachTimesheetsToInvoicesMutation } from './updateJobAttachTimesheetsToInvoices.graphql.types'
