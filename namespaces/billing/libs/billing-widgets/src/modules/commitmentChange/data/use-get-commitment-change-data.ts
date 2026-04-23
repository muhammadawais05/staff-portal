import { useMemo } from 'react'
import { EngagementCommitmentEnum } from '@staff-portal/graphql/staff'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'

import { useGetEngagement } from '../../engagement/data'

const DEFAULT_RATE = '0.0'
const DEFAULT_DISCOUNT_MULTIPLIER = '0.0'

export const useGetCommitmentChangeData = (engagementId: string) => {
  const encodedEngagementId = useMemo(
    () =>
      encodeId({
        id: engagementId,
        type: 'engagement'
      }),
    [engagementId]
  )

  const {
    data: {
      canBeDiscounted = false,
      commitment = EngagementCommitmentEnum.FULL_TIME,
      companyFullTimeRate = DEFAULT_RATE,
      companyHourlyRate = DEFAULT_RATE,
      companyPartTimeRate = DEFAULT_RATE,
      defaultFullTimeDiscount,
      defaultMarkup,
      defaultPartTimeDiscount,
      defaultUpcharge,
      discountMultiplier = DEFAULT_DISCOUNT_MULTIPLIER,
      fullTimeDiscount = defaultFullTimeDiscount,
      job,
      markup,
      partTimeDiscount = defaultPartTimeDiscount,
      rateMethod,
      talentFullTimeRate = DEFAULT_RATE,
      talentHourlyRate = DEFAULT_RATE,
      talentPartTimeRate = DEFAULT_RATE,
      operations: {
        changeEngagementCommitment: changeEngagementCommitmentOperation
      } = {}
    } = {},
    loading: getEngagementLoading,
    initialLoading: getEngagementInitialLoading
  } = useGetEngagement(encodedEngagementId)

  return {
    canBeDiscounted,
    commitment,
    companyFullTimeRate,
    companyHourlyRate,
    companyPartTimeRate,
    defaultFullTimeDiscount,
    defaultMarkup,
    defaultPartTimeDiscount,
    defaultUpcharge,
    discountMultiplier,
    fullTimeDiscount,
    job,
    markup,
    partTimeDiscount,
    rateMethod,
    talentFullTimeRate,
    talentHourlyRate,
    talentPartTimeRate,
    changeEngagementCommitmentOperation,
    loading: getEngagementLoading,
    initialLoading: getEngagementInitialLoading
  }
}
