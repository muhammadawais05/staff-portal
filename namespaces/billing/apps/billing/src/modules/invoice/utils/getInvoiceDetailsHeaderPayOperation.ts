import {
  DocumentStatus,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { isCallableHidden } from '@staff-portal/billing/src/_lib/helpers/operations'

import { isInvoiceOriginal } from './'
import { GetInvoiceDetailsHeaderQuery } from '../components/InvoiceDetailsPageHeader/data/getInvoiceDetailsHeader.graphql.types'

type GetInvoiceDetailsHeaderPayOperation = Pick<
  Exclude<
    Exclude<GetInvoiceDetailsHeaderQuery, null | undefined>['node'],
    null | undefined
  >,
  'consolidatedInvoice' | 'status' | 'operations'
>

// TODO:
// Techdebt this should be an Operation
const getInvoiceDetailsHeaderPayOperation = ({
  consolidatedInvoice,
  status,
  operations
}: GetInvoiceDetailsHeaderPayOperation) => {
  const isOriginal = isInvoiceOriginal({ consolidatedInvoice })
  const isDraft = status === DocumentStatus.DRAFT

  if (isCallableHidden(operations?.createTransferInvoice?.callable)) {
    return operations.createTransferInvoice
  }

  if (isDraft || isOriginal) {
    return {
      callable: OperationCallableTypes.DISABLED,
      messages: [
        i18n.t(
          `invoice:invoiceDetails.header.${
            isOriginal ? 'cannotPayOriginalInvoice' : 'cannotPayDraftInvoice'
          }`
        )
      ]
    }
  }

  return {
    callable: OperationCallableTypes.ENABLED,
    messages: []
  }
}

export default getInvoiceDetailsHeaderPayOperation
