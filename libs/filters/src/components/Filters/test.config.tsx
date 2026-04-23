import { Item as AutocompleteItem } from '@toptal/picasso/Autocomplete/types'

import { FilterConfigType, SortOption } from '../../types'
import { FiltersConfig } from './types'

// `test.config.tsx` was decomposed from `test.tsx`
// because of 300-rows limitation for file via eslint

const useGetTestAutocompleteOptions = (() => {
  let options: AutocompleteItem[] = []
  let loading = true

  return () => ({
    getOptions() {
      // fake lazy query
      options = Array.from({ length: 10 })
        .fill(1)
        .map((val, idx) => ({
          label: `label ${idx}`,
          node: {
            id: idx
          }
        }))
      loading = false
    },
    options,
    loading
  })
})()
const useGetTestAutocompleteFilterLabel = (
  filterValue: string | undefined
) => ({
  label: filterValue,
  loading: false
})

// eslint-disable-next-line jest/no-export
export const TEST_FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.AUTOCOMPLETE,
    name: 'autocompleteFilter',
    label: 'Autocomplete Filter',
    useGetOptions: useGetTestAutocompleteOptions,
    useGetFilterLabel: useGetTestAutocompleteFilterLabel,
    getKey: item => (item as { node?: { id?: string } })?.node?.id || '',
    getId: item => (item as { node?: { id?: string } })?.node?.id || '',
    getLabel: item => (item as { label?: string })?.label || ''
  },
  {
    type: FilterConfigType.CHECKBOX,
    name: 'checkboxesFilter',
    label: 'Checkboxes Filter',
    options: [
      { label: 'Option 1', value: 'Checkbox 1' },
      { label: 'Option 2', value: 'Checkbox 2' },
      { label: 'Option 3', value: 'Checkbox 3' }
    ]
  },
  {
    type: FilterConfigType.RADIO,
    name: 'radioFilter',
    label: 'Radio Filter',
    options: [
      { label: 'Radio 1', value: 'Radio 1' },
      { label: 'Radio 2', value: 'Radio 2' },
      { label: 'Radio 3', value: 'Radio 3' }
    ]
  },
  [
    {
      type: FilterConfigType.SELECT,
      name: 'selectFilter',
      label: 'Select Filter',
      options: [
        { label: 'Select Option 1', value: '1' },
        { label: 'Select Option 2', value: '2' },
        { label: 'Select Option 3', value: '3' }
      ]
    },
    {
      type: FilterConfigType.DATE_RANGE,
      name: 'dateRangeFilter',
      label: 'Date Range Filter'
    }
  ],
  [
    {
      type: FilterConfigType.AMOUNT_RANGE,
      name: 'amountRangeFilter',
      label: 'Amount Range Filter',
      options: { min: '0', max: '100', maxLength: 6 }
    }
  ],
  {
    type: FilterConfigType.PRESET,
    name: 'presetFilter',
    label: 'Preset filter',
    options: [
      {
        label: 'Preset 1',
        key: 'preset1',
        values: [
          {
            filter: 'foo',
            value: 'bar'
          }
        ]
      },
      {
        label: 'Preset 2',
        key: 'preset2',
        values: [
          {
            filter: 'bar',
            value: ['foo', 'bar']
          }
        ]
      }
    ]
  }
]

// eslint-disable-next-line jest/no-export
export const TEST_SORT_OPTIONS: SortOption[] = [
  {
    text: 'Created at',
    value: 'created_at'
  },
  {
    text: 'Applied at',
    value: 'applied_at'
  }
]

// just to mark this file as a test file for IDE
// eslint-disable-next-line jest/require-top-level-describe, jest/no-disabled-tests
it.skip('Configuration for Filters tests', () => undefined)
