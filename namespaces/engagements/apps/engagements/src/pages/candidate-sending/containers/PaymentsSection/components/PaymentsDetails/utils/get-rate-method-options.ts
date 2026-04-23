import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

const sortOrder: Record<string, number> = {
  [EngagementRateMethodEnum.DEFAULT]: 0,
  [EngagementRateMethodEnum.OVERRIDE_USING_MARKUP_DISCOUNT_VALUES]: 1,
  [EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES]: 2,
  [EngagementRateMethodEnum.LEGACY]: 3
}

const getSortedRateMethods = () =>
  Object.keys(EngagementRateMethodEnum).sort((firstItem, secondItem) => {
    return sortOrder[firstItem] - sortOrder[secondItem]
  })

export const getRateMethodOptions = () =>
  getSortedRateMethods()
    .map(item => ({
      text:
        item[0].toUpperCase() +
        item.substring(1).split('_').join(' ').toLowerCase(),
      value: item
    }))
    .filter(option => option.value !== EngagementRateMethodEnum.LEGACY)
