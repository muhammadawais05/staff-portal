import { ColorType } from '@toptal/picasso'
import {
  BillingMethodName,
  BillingOptionInterface,
  BillingOptionInterfaceConnection,
  CreateTransferInvoiceInput,
  DocumentStatus,
  InvoicePaymentMethods,
  InvoicePaymentSources,
  InvoicePendingReceiptPaymentMethods,
  InvoicesTotalsCategory,
  PaymentsTotalsCategory,
  Maybe
} from '@staff-portal/graphql/staff'

import { NodeIdPrefix, decodeId } from '../apollo'

type Status = Partial<
  Record<
    | keyof typeof DocumentStatus
    | keyof typeof InvoicesTotalsCategory
    | keyof typeof PaymentsTotalsCategory,
    ColorType
  >
>

const statusMap: Status = {
  [InvoicesTotalsCategory.CREDITED]: 'yellow',
  [PaymentsTotalsCategory.DEBITED]: 'yellow',
  [DocumentStatus.DRAFT]: 'dark-grey',
  [DocumentStatus.OUTSTANDING]: 'yellow',
  [DocumentStatus.PAID]: 'green',
  [DocumentStatus.DISPUTED]: 'red',
  [DocumentStatus.IN_COLLECTIONS]: 'red',
  [DocumentStatus.WRITTEN_OFF]: 'red',
  [DocumentStatus.DUE]: 'red',
  [DocumentStatus.OVERDUE]: 'red',
  [DocumentStatus.ON_HOLD]: 'yellow',
  [DocumentStatus.PENDING_RECEIPT]: 'yellow'
}

export const getDocumentStatusColor = (
  status: DocumentStatus | InvoicesTotalsCategory
): ColorType => statusMap[status] ?? 'dark-grey'

export const getColorForAmountLeft = ({
  amountLeft,
  totalAmount,
  threshold
}: {
  amountLeft: number
  totalAmount: number
  threshold: number
}): ColorType => {
  const percentageUsed = 100 - (amountLeft / totalAmount) * 100
  const isBeyondThreshold = percentageUsed > threshold

  return amountLeft <= 0 ? 'red' : isBeyondThreshold ? 'yellow' : 'black'
}

export type BillingMethodOption = {
  disabled: boolean
  id: string
  last4Digits: string
  numericId: number
  primary: boolean
}

export type BillingMethodsOptions = {
  [key in BillingMethodName]?: {
    options: BillingMethodOption[]
    newestId: number
    preferred: boolean
  }
}

export interface BillingOption {
  billingMethod: BillingMethodName
  cardExpired?: boolean
  id: string
  last4Digits?: string
}

export interface PaymentSource {
  disabled: boolean
  label: string
  newestId: number
  preferred: boolean
  value: InvoicePaymentSources
}

export const sortByPrimaryAndNumericId = (
  optA: BillingMethodOption,
  optB: BillingMethodOption
) => {
  if (optA.primary === optB.primary) {
    return optA.numericId - optB.numericId
  }

  return optA.primary ? -1 : 1
}

export const PAYMENT_SOURCES_ORDER = [
  InvoicePaymentSources.RECORD,
  InvoicePaymentSources.CREDIT_CARD,
  InvoicePaymentSources.ACH,
  InvoicePaymentSources.PENDING_RECEIPT,
  InvoicePaymentSources.UNAPPLIED_CASH
]

export const sortByPaymentSourcesOrder = (
  valA: PaymentSource,
  valB: PaymentSource
) => {
  const indexA = PAYMENT_SOURCES_ORDER.indexOf(valA.value)
  const indexB = PAYMENT_SOURCES_ORDER.indexOf(valB.value)

  return indexA - indexB
}

/*
 * Returns an object keyed with billing sources' names.
 * Each source's `options` are sorted by their `numericId`,
 * with the preferred option (if present) being set first.
 * Each source also has `newestId` and `preferred` keys
 * for further sorting purposes.
 * {
 *   ACH: {
 *     options: [],
 *     newestId: 123,
 *     preferred: true
 *   }
 * }
 **/

interface ClientBllingOptions {
  billingOptions?: BillingOptionInterfaceConnection | null
  preferredBillingOption?: Maybe<BillingOptionInterface>
}

export const getBillingOptionsFromClient = ({
  preferredBillingOption,
  billingOptions
}: ClientBllingOptions) => {
  if (!billingOptions) {
    return {} as BillingMethodsOptions
  }

  return billingOptions.nodes.reduce(
    (obj: BillingMethodsOptions, billingOption) => {
      if (!billingOption.billingMethod) {
        return obj
      }

      const {
        billingMethod,
        cardExpired = false,
        id,
        last4Digits = ''
      } = billingOption as BillingOption

      let type: keyof typeof NodeIdPrefix

      switch (billingMethod) {
        case BillingMethodName.ACH:
          type = 'billingAch'
          break
        case BillingMethodName.CREDIT_CARD:
          type = 'billingCreditCard'
          break
        default:
          type = 'billingOther'
      }

      const numericId = Number(decodeId({ id, type }))

      const option = {
        disabled: !!cardExpired,
        id,
        last4Digits,
        numericId,
        primary: preferredBillingOption?.id === id
      }

      const newestId = obj[billingMethod]?.newestId || -1
      const options = (obj[billingMethod]?.options || [])
        .concat(option)
        .sort(sortByPrimaryAndNumericId)

      obj[billingMethod] = {
        newestId: Math.max(numericId, newestId),
        options,
        preferred: preferredBillingOption?.billingMethod === billingMethod
      }

      return obj
    },
    {}
  )
}

export interface InvoicePayModalFormValues
  extends Omit<
    CreateTransferInvoiceInput,
    'paymentMethod' | 'paymentSource' | 'pendingReceiptPaymentMethod'
  > {
  amountCompareKey: string
  discountedAmount: string
  paymentMethod: InvoicePaymentMethods | ''
  paymentSource: InvoicePaymentSources | ''
  pendingReceiptPaymentMethod: InvoicePendingReceiptPaymentMethods | ''
  undiscountedAmount: string
}

export const paymentOptionIsDiscountable = ({
  paymentMethod,
  paymentSource
}: InvoicePayModalFormValues) => {
  switch (paymentSource) {
    case InvoicePaymentSources.ACH:
    case InvoicePaymentSources.PENDING_RECEIPT:
    case InvoicePaymentSources.UNAPPLIED_CASH:
      return true
    case InvoicePaymentSources.CREDIT_CARD:
      return false
    default:
      switch (paymentMethod) {
        case InvoicePaymentMethods.PAYPAL:
        case '':
          return false
        default:
          return true
      }
  }
}
