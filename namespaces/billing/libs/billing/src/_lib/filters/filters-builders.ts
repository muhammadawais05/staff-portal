import { camelCase } from 'lodash-es'
import {
  FilterConfig,
  SelectFilterConfigOptions,
  CheckboxFilterConfigOptions
} from '@staff-portal/filters'

import i18n from '../../utils/i18n'
import { AutocompleteOption } from '../../utils/listSearch'

export const defaultOptions: SelectFilterConfigOptions = [
  { label: i18n.t('common:filters.fields.dropdown.empty'), value: null }
]

export const buildDropdownFilter =
  (
    name: string,
    label: string,
    useSource: () => {
      options: SelectFilterConfigOptions
      loading: boolean
    },
    extraOptions: SelectFilterConfigOptions = []
    // eslint-disable-next-line max-params
  ): (() => FilterConfig) =>
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  () => {
    const { options, loading } = useSource()

    return {
      label,
      loading,
      name,
      options: [...defaultOptions, ...extraOptions, ...options],
      type: 'SELECT'
    }
  }

export const buildCheckboxFilter =
  (
    name: string,
    label: string,
    useSource: () => {
      options: CheckboxFilterConfigOptions
      loading: boolean
    }
  ): (() => FilterConfig) =>
  // @ts-expect-error ENUM FilterConfigType expected, value used instead
  () => {
    const { options, loading } = useSource()

    return {
      label,
      loading,
      name,
      options,
      type: 'CHECKBOX'
    }
  }

export const buildAmountFilter = (name: string): FilterConfig => {
  return {
    label: i18n.t('common:filters.fields.common.amount'),
    name,
    // eslint-disable-next-line
    // @ts-ignore
    options: {
      // eslint-disable-next-line
      // @ts-ignore
      min: '0'
    },
    // eslint-disable-next-line
    // @ts-ignore
    type: 'AMOUNT_RANGE'
  }
}

export const buildHiddenFilter = (name: string): FilterConfig => ({
  name,
  label: i18n.t(`common:filters.fields.common.${camelCase(name)}`),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  type: 'HIDDEN'
})

export const buildDateRangeFilter = (
  name: string,
  i18Key?: string
): FilterConfig => {
  return {
    label: i18n.t(
      `common:filters.fields.datePickers.${i18Key || camelCase(name)}`
    ),
    name,
    // eslint-disable-next-line
    // @ts-ignore
    type: 'DATE_RANGE'
  }
}

export const getAutocompleteNodeFor =
  (key: 'id' | 'label' = 'id') =>
  (node: AutocompleteOption = { id: '', label: '' }) =>
    node[key]
