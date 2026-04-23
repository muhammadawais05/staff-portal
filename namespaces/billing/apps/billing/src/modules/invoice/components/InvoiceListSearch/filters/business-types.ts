import { BusinessTypes } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const businessTypesFilterConfig: FilterConfig = {
  label: i18n.t('invoiceList:filters.fields.common.businessTypes'),
  name: 'business_types',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.individual'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.INDIVIDUAL
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.startUp'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.START_UP
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.nonProfit'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.NON_PROFIT
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.devShopOrAgency'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.DEV_SHOP_OR_AGENCY
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.smallBusiness'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.SMALL_BUSINESS
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.mediumBusiness'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.MEDIUM_BUSINESS
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.enterpriseBusiness'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.ENTERPRISE_BUSINESS
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.businessTypes.government'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: BusinessTypes.GOVERNMENT
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default businessTypesFilterConfig
