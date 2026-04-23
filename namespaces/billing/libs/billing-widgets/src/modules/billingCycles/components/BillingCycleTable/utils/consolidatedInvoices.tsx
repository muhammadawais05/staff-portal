import { get, maxBy, minBy, sumBy } from 'lodash-es'
import { Maybe } from '@staff-portal/graphql/staff'
import { parseISOTime } from '@staff-portal/billing/src/_lib/dateTime'

import { CommitmentFragment } from '../../../../__fragments__/commitmentFragment.graphql.types'
import { BillingCycleWithDocs } from '../BillingCycleTable'
import { EngagementDocumentsFragment } from '../../../data/getBillingCycles.graphql.types'

export interface ConsolidatedInvoice {
  childrenCycles: BillingCycleWithDocs[]
}

export const consolidateBillingCycles = (
  billingCycles: BillingCycleWithDocs[]
) => {
  let currentConsolidatedCycle: Maybe<BillingCycleWithDocs>,
    currentConsolidatedCycleId

  for (let idx = 0; idx < billingCycles.length; idx++) {
    const cycle = billingCycles[idx]
    const firstInvoice = cycle.invoices.slice(0, 1)
    const consolidatedInvoice = firstInvoice[0]?.consolidatedDocument

    if (
      consolidatedInvoice &&
      consolidatedInvoice.gid === currentConsolidatedCycleId
    ) {
      // @ts-expect-error code left the same, TS reports an error, suggest to rewrite with a simple reduce fn
      ;(currentConsolidatedCycle as BillingCycleWithDocs).childrenCycles.push(
        cycle
      )
      billingCycles.splice(idx, 1)
      idx--
    } else {
      currentConsolidatedCycle = cycle
      currentConsolidatedCycleId = consolidatedInvoice?.gid
    }
  }

  billingCycles.forEach(cycle => {
    if (cycle.childrenCycles.length) {
      consolidateBillingCycle(cycle)
    }

    cycle.hasChildAdjustments = cycle.childrenCycles.some(childrenCycle =>
      childrenCycle.invoices.some(
        invoice =>
          Number(invoice.creditedAmount) || Number(invoice.debitedAmount)
      )
    )
  })
}

export const consolidateBillingCycle = (billingCycle: BillingCycleWithDocs) => {
  billingCycle.childrenCycles.unshift({
    ...billingCycle,
    actualCommitment: { ...billingCycle.actualCommitment },
    childrenCycles: [],
    originalCommitment: { ...billingCycle.originalCommitment }
  })

  billingCycle.hours = sumBy(billingCycle.childrenCycles, val =>
    Number(val.hours)
  ).toString()

  billingCycle.chargedHours = sumBy(billingCycle.childrenCycles, val =>
    Number(val.chargedHours)
  ).toString()

  const minDateCycle = minBy(billingCycle.childrenCycles, val =>
    parseISOTime(val.startDate).toMillis()
  )

  billingCycle.startDate = minDateCycle?.startDate || ''

  const maxDateCycle = maxBy(billingCycle.childrenCycles, val =>
    parseISOTime(val.endDate).toMillis()
  )

  billingCycle.endDate = maxDateCycle?.endDate || ''

  billingCycle.kind = calculateConsolidatedField(billingCycle, 'kind')
  billingCycle.actualCommitment = billingCycle.originalCommitment = {
    availability: calculateConsolidatedField(
      billingCycle,
      'actualCommitment.availability'
    )
  } as CommitmentFragment

  billingCycle.invoices = [
    {
      ...billingCycle.invoices[0].consolidatedDocument
    } as EngagementDocumentsFragment['invoices'][number]
  ]

  billingCycle.payments = [
    {
      amount: calculateConsolidatedDocTotal(billingCycle, 'payments'),
      creditedAmount: 0,
      debitedAmount: 0,
      paidAmount: 0,
      status: ''
    } as unknown as EngagementDocumentsFragment['payments'][number]
  ]

  billingCycle.commissions = [
    {
      amount: calculateConsolidatedDocTotal(billingCycle, 'commissions'),
      creditedAmount: 0,
      debitedAmount: 0,
      paidAmount: 0,
      status: ''
    } as unknown as EngagementDocumentsFragment['commissions'][number]
  ]
}

export const calculateConsolidatedDocTotal = (
  billingCycle: BillingCycleWithDocs,
  docType: 'payments' | 'commissions'
) => {
  let total = 0

  billingCycle.childrenCycles.forEach(
    val =>
      (total += val[docType].reduce(
        (acum: number, curr) => acum + Number(curr.amount),
        0
      ))
  )

  return total
}

export const calculateConsolidatedField = (
  billingCycle: BillingCycleWithDocs,
  fieldName: string
) => {
  let finalValue

  for (const childCycle of billingCycle.childrenCycles) {
    if (finalValue && get(childCycle, fieldName) !== finalValue) {
      finalValue = 'multi'
      break
    }
    finalValue = get(childCycle, fieldName)
  }

  return finalValue
}
