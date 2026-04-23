import { camelCase } from 'lodash-es'
import { EngagementRateMethodEnum } from '@staff-portal/graphql/staff'

const isCustomValuesRateMethod = (rateMethod?: string) =>
  camelCase(rateMethod) ===
  camelCase(EngagementRateMethodEnum.OVERRIDE_USING_CUSTOM_VALUES)

const isDefaultRateMethod = (rateMethod?: string) =>
  camelCase(rateMethod) === camelCase(EngagementRateMethodEnum.DEFAULT)

const isLegacyRateMethod = (rateMethod?: string) =>
  camelCase(rateMethod) === camelCase(EngagementRateMethodEnum.LEGACY)

const isMarkupDiscountValuesRateMethod = (rateMethod?: string) =>
  camelCase(rateMethod) ===
  camelCase(EngagementRateMethodEnum.OVERRIDE_USING_MARKUP_DISCOUNT_VALUES)

const isDefaultOrLegacyRateMethod = (rateMethod?: string) =>
  isDefaultRateMethod(rateMethod) || isLegacyRateMethod(rateMethod)

const shouldDisplayDiscountTierRateFields = (rateMethod?: string) =>
  isDefaultRateMethod(rateMethod) ||
  isMarkupDiscountValuesRateMethod(rateMethod)

const isRateMethodOverride = (rateMethod?: string) =>
  isCustomValuesRateMethod(rateMethod) ||
  isMarkupDiscountValuesRateMethod(rateMethod)

export {
  isCustomValuesRateMethod,
  isDefaultRateMethod,
  isDefaultOrLegacyRateMethod,
  isMarkupDiscountValuesRateMethod,
  isLegacyRateMethod,
  shouldDisplayDiscountTierRateFields,
  isRateMethodOverride
}
