import { isNotNullish } from '@staff-portal/utils'

const getDisplayStatusMessage = ({
  hasUnpaidDepositInvoices,
  availablePrepaymentBalanceNullable,
  minimumClientCreditRequired
}: {
  hasUnpaidDepositInvoices?: boolean
  availablePrepaymentBalanceNullable?: string | null
  minimumClientCreditRequired?: string
}) =>
  hasUnpaidDepositInvoices &&
  isNotNullish(availablePrepaymentBalanceNullable) &&
  isNotNullish(minimumClientCreditRequired) &&
  Number(availablePrepaymentBalanceNullable) <
    Number(minimumClientCreditRequired)

export default getDisplayStatusMessage
