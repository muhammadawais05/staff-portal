import { BillingCycleWithDocs } from '../../BillingCycleTable/BillingCycleTable'

export const getConsolidatedInvoice = ({
  billingCycle,
  isChild
}: {
  billingCycle: BillingCycleWithDocs
  isChild: boolean
}) => {
  const { invoices, childrenCycles } = billingCycle

  if (isChild || !invoices.length) {
    return null
  }

  const hasChildrenRows = childrenCycles.some(
    cycle => cycle.actualCommitment.availability !== ('extra_hours' as string)
  )

  const consolidatedInvoice = hasChildrenRows
    ? invoices[0]
    : invoices.find(invoice => !!invoice.consolidatedDocument)
        ?.consolidatedDocument

  return consolidatedInvoice
}
