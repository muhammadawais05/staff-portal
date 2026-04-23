import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import {
  useGetPaymentDetailsTableQuery,
  GetPaymentDetailsTableQuery,
  GetPaymentDetailsTableSubjectObjectTalentFragment
} from './getPaymentDetailsTable.graphql.types'

export const useGetPaymentDetailsTable = (paymentId: string) =>
  useGetNode(useGetPaymentDetailsTableQuery)({ id: paymentId })

export type {
  GetPaymentDetailsTableQuery,
  GetPaymentDetailsTableSubjectObjectTalentFragment
}
