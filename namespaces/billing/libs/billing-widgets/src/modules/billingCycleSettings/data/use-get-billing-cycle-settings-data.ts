import { useMemo } from 'react'
import { BillCycle } from '@staff-portal/graphql/staff'
import {
  encodeId,
  getOldGID
} from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useGetBillingCyclesQuery } from '../../billingCycles/data'
import { useGetEngagement } from '../../engagement/data'

const ENGAGEMENT_TYPE = 'engagement'

export const useGetBillingCycleSettingsData = (engagementId: string) => {
  const encodedEngagementId = useMemo(
    () =>
      encodeId({
        id: engagementId,
        type: ENGAGEMENT_TYPE
      }),
    [engagementId]
  )

  const engagementGid = useMemo(
    () =>
      getOldGID({
        id: Number(engagementId),
        type: ENGAGEMENT_TYPE
      }),
    [engagementId]
  )

  const {
    data: {
      job,
      billCycle = BillCycle.MONTHLY,
      billDay,
      semiMonthlyPaymentTalentAgreement,
      operations: {
        changeProductBillingFrequency: changeProductBillingFrequencyOperation
      } = {}
    } = {},
    loading: getEngagementLoading,
    initialLoading: getEngagementInitialLoading
  } = useGetEngagement(encodedEngagementId, 'no-cache')

  const {
    data,
    loading: getBillingCycleLoading,
    initialLoading: getBillingCycleInitialLoading
  } = useGetBillingCyclesQuery({
    variables: {
      id: encodedEngagementId,
      engagementGid
    }
  })

  return {
    job,
    billCycle,
    billDay,
    semiMonthlyPaymentTalentAgreement: !!semiMonthlyPaymentTalentAgreement,
    changeProductBillingFrequencyOperation,
    billingCycles: data?.node?.billingCycles.nodes || [],
    loading: getEngagementLoading || getBillingCycleLoading,
    initialLoading: getEngagementInitialLoading || getBillingCycleInitialLoading
  }
}
