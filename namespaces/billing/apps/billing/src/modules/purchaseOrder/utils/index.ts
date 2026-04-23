import { ColorType } from '@toptal/picasso'
import { Maybe } from '@staff-portal/graphql/staff'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import { decodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

/**
 * Amount left is displayed in _black_,
 *   if the % of the invoiced amount (complement of the amount left)
 *   is smaller than the threshold (if present),
 *   or if the threshold is unset (and total amount hasn’t been surpassed).
 *
 * Amount left is displayed in _orange_,
 *   if the % of the invoiced amount (complement of the amount left)
 *   is larger than the threshold (if present).
 *
 * Amount left is displayed in _red_,
 *   if the invoiced amount is larger than the total amount
 */
export const getColorByValues = ({
  threshold,
  invoicedAmount,
  totalAmount
}: {
  threshold?: Maybe<string>
  invoicedAmount?: Maybe<string>
  totalAmount?: Maybe<string>
}) => {
  const percentageOfBudgetSpent =
    (Number(invoicedAmount) / Number(totalAmount)) * 100
  const thresholdReached =
    threshold && percentageOfBudgetSpent >= Number(threshold)
  const budgetSpent =
    totalAmount && Number(invoicedAmount) >= Number(totalAmount)

  return getColorByConditions({
    budgetSpent,
    thresholdReached
  })
}

export const getPurchaseOrderLineTitle = (
  purchaseOrderLineId: string,
  purchaseOrderId: Maybe<string>
) => {
  const poNumber = purchaseOrderId
    ? `${decodeId({ id: purchaseOrderId, type: 'purchaseOrder' })}-`
    : ''

  return `Purchase Order Line #${poNumber}${decodeId({
    id: purchaseOrderLineId,
    type: 'purchaseOrderLine'
  })}`
}

interface GetColorByConditions {
  budgetSpent?: Maybe<boolean | string>
  thresholdReached?: Maybe<boolean | string>
}

export const getColorByConditions = ({
  budgetSpent,
  thresholdReached
}: GetColorByConditions): ColorType =>
  thresholdReached ? 'yellow' : budgetSpent ? 'red' : 'dark-grey'

export const purchaseOrderListUpdateEvents = [
  ApolloContextEvents.purchaseOrderCreate
]

export { default as getInitialValuesToUpdatePurchaseOrder } from './getInitialValuesToUpdatePurchaseOrder'
