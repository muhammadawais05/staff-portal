import { EngagementDocumentsFragment } from '../../billingCycles/data/getBillingCycles.graphql.types'

export interface BillingDocumentsTotals {
  totalHours?: number
  totalPaidCompany?: number
  totalPaidTalent?: number
  totalPaidCommissions?: number
  totalDebitsCompany?: number
  totalDebitsTalent?: number
  totalDebitsCommissions?: number
  totalCreditsCompany?: number
  totalCreditsTalent?: number
  totalCreditsCommissions?: number
}

export const calculateTotals = (
  documents?: EngagementDocumentsFragment
): BillingDocumentsTotals => {
  const {
    paid: totalPaidCompany,
    credits: totalCreditsCompany,
    debits: totalDebitsCompany
  } = calculateTotalsFor(documents?.invoices)

  const {
    paid: totalPaidTalent,
    credits: totalCreditsTalent,
    debits: totalDebitsTalent
  } = calculateTotalsFor(documents?.payments)

  const {
    paid: totalPaidCommissions,
    credits: totalCreditsCommissions,
    debits: totalDebitsCommissions
  } = calculateTotalsFor(documents?.commissions)

  return {
    totalCreditsCommissions,
    totalCreditsCompany,
    totalCreditsTalent,
    totalDebitsCommissions,
    totalDebitsCompany,
    totalDebitsTalent,
    totalPaidCommissions,
    totalPaidCompany,
    totalPaidTalent
  }
}

const calculateTotalsFor = (
  documents: {
    paidAmount: string
    creditedAmount: string
    debitedAmount: string
  }[] = []
) => {
  const totals = { credits: 0, debits: 0, paid: 0 }

  documents.forEach(({ paidAmount, creditedAmount, debitedAmount }) => {
    totals.paid += Number(paidAmount)
    totals.credits += Number(creditedAmount)
    totals.debits += Number(debitedAmount)
  })

  return totals
}

export const hasAdjustmentText = ({
  creditedAmount,
  debitedAmount
}: {
  creditedAmount: string
  debitedAmount: string
}) => !!Number(creditedAmount) || !!Number(debitedAmount)
