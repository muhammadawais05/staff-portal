import { remove } from 'lodash-es'
import { InvoiceKind } from '@staff-portal/graphql/staff'

import { BillingCycleWithDocs } from '../BillingCycleTable'

const buildExtraHoursRow = (cycle: BillingCycleWithDocs) => {
  return {
    ...cycle,
    childrenCycles: [],
    originalCommitment: {
      ...cycle.originalCommitment,
      availability: 'extra_hours' as string
    },
    actualCommitment: {
      ...cycle.actualCommitment,
      availability: 'extra_hours' as string
    },
    invoices: remove(
      cycle.invoices,
      invoice => invoice.kind === InvoiceKind.EXTRA_HOURS
    ),
    payments: remove(cycle.payments, payment => payment.extraHours),
    commissions: remove(cycle.commissions, commission => commission.extraHours),
    chargedHours: cycle.extraHours
  } as BillingCycleWithDocs
}

export const addExtraHoursToCycles = (
  billingCycles: BillingCycleWithDocs[]
) => {
  billingCycles.forEach(cycle => {
    for (let index = 0; index < cycle.childrenCycles.length; index++) {
      const childCycle = cycle.childrenCycles[index]

      if (Number(childCycle.extraHours)) {
        cycle.childrenCycles.splice(++index, 0, buildExtraHoursRow(childCycle))
      }
    }

    if (!cycle.childrenCycles.length && !!Number(cycle.extraHours)) {
      cycle.childrenCycles.push(buildExtraHoursRow(cycle))
    }
  })
}
