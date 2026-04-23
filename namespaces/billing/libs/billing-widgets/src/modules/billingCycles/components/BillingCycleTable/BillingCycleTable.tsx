import { Table } from '@toptal/picasso'
import React, { useEffect } from 'react'
import { TypedMessage } from '@toptal/staff-portal-message-bus'
import {
  ApolloContextEvents,
  Refetch
} from '@staff-portal/billing/src/@types/types'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'
import { useRefetch } from '@staff-portal/billing/src/_lib/helpers/apollo/useRefetch'

import { BillingCyclesItemFragment } from '../../../__fragments__/billingCyclesFragment.graphql.types'
import { consolidateBillingCycles } from './utils/consolidatedInvoices'
import TableHead from '../TableHead'
import TableRow from '../TableRow'
import BillingTableFooter from '../../../billingTable/components/BillingTableFooter'
import {
  EngagementDocumentsFragment,
  GetBillingCyclesQuery
} from '../../data/getBillingCycles.graphql.types'
import { addExtraHoursToCycles } from './utils/addExtraHoursToCycles'
import {
  calculateTotalsWithHours,
  processBillingCycles
} from './utils/processBillingCycles'

export type BillingCycleWithDocs = Exclude<
  BillingCyclesItemFragment &
    EngagementDocumentsFragment & {
      childrenCycles: BillingCycleWithDocs[]
      hasChildAdjustments: boolean
    },
  undefined | null
>

interface Props {
  data?: GetBillingCyclesQuery
  refetch: Refetch
  listenedBillingCycleMessages?: TypedMessage[]
}

const displayName = 'BillingCycleTable'

export const BillingCycleTable = ({
  data,
  refetch,
  listenedBillingCycleMessages = []
}: Props) => {
  const billingCycles = data?.node?.billingCycles?.nodes || []
  const documents = data?.engagementDocuments

  const processedBillingCycles = processBillingCycles(billingCycles, documents)

  const totals = calculateTotalsWithHours(processedBillingCycles, documents)

  consolidateBillingCycles(processedBillingCycles)
  addExtraHoursToCycles(processedBillingCycles)

  const { handleInboundEvent, handleInboundEventUnsubscribe } =
    useExternalIntegratorContext()

  useRefetch(
    [
      ...listenedBillingCycleMessages,
      ApolloContextEvents.timesheetUpdate,
      ApolloContextEvents.timesheetSubmit,
      ApolloContextEvents.timesheetUnsubmit
    ],
    refetch
  )

  useEffect(() => {
    handleInboundEvent('refetch_query:billingCycles', {
      refetchQuery: refetch
    })
    handleInboundEvent('refetch_query:engagementDocuments', {
      refetchQuery: refetch
    })

    return () => {
      handleInboundEventUnsubscribe('refetch_query:billingCycles')
      handleInboundEventUnsubscribe('refetch_query:engagementDocuments')
    }
  }, [handleInboundEvent, handleInboundEventUnsubscribe, refetch])

  return (
    <Table data-testid={displayName}>
      <TableHead />
      <Table.Body>
        {processedBillingCycles.map((billingCycle, idx) => (
          <TableRow
            billingCycle={billingCycle}
            isAltColor={idx % 2 === 0}
            isChild={false}
            key={billingCycle.gid}
          />
        ))}
      </Table.Body>
      <BillingTableFooter
        hasHours
        hasTalentTotals
        isCondensed
        totals={totals}
      />
    </Table>
  )
}

BillingCycleTable.displayName = displayName

export default BillingCycleTable
