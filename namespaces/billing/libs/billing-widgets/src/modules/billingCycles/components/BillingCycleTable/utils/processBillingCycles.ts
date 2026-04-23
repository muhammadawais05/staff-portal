import { sumBy } from 'lodash-es'
import { BillingCycleStatus } from '@staff-portal/graphql/staff'

import { BillingCyclesItemFragment } from '../../../../__fragments__/billingCyclesFragment.graphql.types'
import { EngagementDocumentsFragment } from '../../../data/getBillingCycles.graphql.types'
import {
  BillingDocumentsTotals,
  calculateTotals
} from '../../../../billingTable/utils'
import { BillingCycleWithDocs } from '../BillingCycleTable'

type CommercialDocument =
  | EngagementDocumentsFragment['payments'][number]
  | EngagementDocumentsFragment['invoices'][number]
  | EngagementDocumentsFragment['commissions'][number]

export const processBillingCycles = (
  billingCycles: BillingCyclesItemFragment[],
  documents?: EngagementDocumentsFragment
) => {
  const processedBillingCycles: BillingCycleWithDocs[] = billingCycles.map(
    billingCycle => {
      const processedBillingCycle = { ...billingCycle } as BillingCycleWithDocs
      const fromThisCycle = (document: CommercialDocument) =>
        document.billingCycleGid === billingCycle.gid

      processedBillingCycle.childrenCycles = []
      processedBillingCycle.hasChildAdjustments = false

      processedBillingCycle.invoices =
        (documents?.invoices && documents.invoices.filter(fromThisCycle)) || []
      processedBillingCycle.payments =
        (documents?.payments && documents.payments.filter(fromThisCycle)) || []
      processedBillingCycle.commissions =
        (documents?.commissions &&
          documents.commissions.filter(fromThisCycle)) ||
        []

      return processedBillingCycle
    }
  )

  return processedBillingCycles
}

export const calculateTotalsWithHours = (
  billingCycles: BillingCycleWithDocs[],
  documents?: EngagementDocumentsFragment
): BillingDocumentsTotals => {
  const totalProps = calculateTotals(documents)

  totalProps.totalHours =
    billingCycles &&
    sumBy(billingCycles, ({ status, chargedHours }) =>
      status !== BillingCycleStatus.removed ? Number(chargedHours) : 0
    )

  return totalProps
}
