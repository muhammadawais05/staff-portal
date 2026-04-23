import { InvoiceKind } from '@staff-portal/graphql/staff'
import { FilterConfig } from '@staff-portal/billing/src/_lib/filters/filters-types'
import i18n from '@staff-portal/billing/src/utils/i18n'

const kindsFilterConfig: FilterConfig = {
  label: i18n.t('invoiceList:filters.fields.common.kinds'),
  name: 'kinds',
  // eslint-disable-next-line
  // @ts-ignore
  options: [
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.companyBill'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.COMPANY_BILL
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.companyFine'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.COMPANY_FINE
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.companyDeposit'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.COMPANY_DEPOSIT
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.placementFee'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.PLACEMENT_FEE
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.extraExpenses'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.EXTRA_EXPENSES
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.toptalServicesBill'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.TOPTAL_SERVICES_BILL
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.extraHours'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.EXTRA_HOURS
    },
    {
      label: i18n.t(
        'invoiceList:filters.fields.checkboxes.kind.consolidated'
      ) as string,
      // @ts-expect-error not declared as a possible option value
      value: InvoiceKind.CONSOLIDATED
    }
  ],
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  type: 'CHECKBOX'
}

export default kindsFilterConfig
