import { camelCase } from 'lodash-es'
import { SelectFilterConfigOptions } from '@staff-portal/filters'
import i18n from '@staff-portal/billing/src/utils/i18n'
import { buildDropdownFilter } from '@staff-portal/billing/src/_lib/filters/filters-builders'
import { DropdownOptions } from '@staff-portal/billing/src/_lib/filters/filters-types'

export const buildInvoiceDropdownFilter = (
  name: string,
  useSource: () => {
    options: DropdownOptions
    loading: boolean
  },
  extraOptions: SelectFilterConfigOptions = []
) =>
  buildDropdownFilter(
    name,
    i18n.t(`invoiceList:filters.fields.dropdown.${camelCase(name)}`),
    useSource,
    extraOptions
  )
