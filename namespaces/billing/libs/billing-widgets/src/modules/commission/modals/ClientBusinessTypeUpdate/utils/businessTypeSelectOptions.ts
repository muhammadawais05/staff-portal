import { camelCase } from 'lodash-es'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import i18n from '@staff-portal/billing/src/utils/i18n'

export const businessTypeSelectOptions = [
  BusinessTypes.INDIVIDUAL,
  BusinessTypes.START_UP,
  BusinessTypes.NON_PROFIT,
  BusinessTypes.DEV_SHOP_OR_AGENCY,
  BusinessTypes.SMALL_BUSINESS,
  BusinessTypes.MEDIUM_BUSINESS,
  BusinessTypes.ENTERPRISE_BUSINESS,
  BusinessTypes.GOVERNMENT
].map(businessType => ({
  text: i18n.t(`options:businessType.${camelCase(businessType.toLowerCase())}`),
  value: businessType
}))
