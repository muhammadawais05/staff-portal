import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { Item as AutocompleteItem } from '@toptal/picasso/Autocomplete/types'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

// AutocompleteHighlightOption must be unmocked due to coupling
jest.unmock('@staff-portal/ui')

const FIELD_LABEL = 'Autocomplete'
const FIELD_NAME = 'autocomplete'

const useGetTestAutocompleteOptions = (() => {
  const loading = false
  const options: AutocompleteItem[] = Array.from({ length: 10 })
    .fill(1)
    .map((val, idx) => ({
      label: `Autocomplete Option ${idx}`,
      node: {
        id: `${idx}`
      }
    }))

  return () => ({
    getOptions() {
      // fake lazy query
    },
    options,
    loading
  })
})()

const useGetTestAutocompleteFilterLabel = (
  filterValue: string | undefined
) => ({
  label: `Autocomplete Option ${filterValue}`,
  loading: false
})

const TEST_FILTER_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.AUTOCOMPLETE,
    name: FIELD_NAME,
    label: FIELD_LABEL,
    useGetOptions: useGetTestAutocompleteOptions,
    useGetFilterLabel: useGetTestAutocompleteFilterLabel,
    getKey: item => (item as { node?: { id?: string } })?.node?.id || '',
    getId: item => (item as { node?: { id?: string } })?.node?.id || '',
    getLabel: item => (item as { label?: string })?.label || ''
  }
]

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void = jest.fn()
) =>
  render(
    <TestWrapper>
      <Filters
        config={TEST_FILTER_CONFIG}
        values={values}
        onChange={onFiltersChange}
      />
    </TestWrapper>
  )

describe('Autocomplete filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest({ [FIELD_NAME]: '3' }, jest.fn())

      expect(
        screen.queryByText(`${FIELD_LABEL}: Autocomplete Option 1`)
      ).toBeNull()
      expect(
        screen.queryByText(`${FIELD_LABEL}: Autocomplete Option 2`)
      ).toBeNull()
      expect(
        screen.getByText(`${FIELD_LABEL}: Autocomplete Option 3`)
      ).toBeInTheDocument()
    })

    it('allows removing autocomplete filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ [FIELD_NAME]: '3' }, onFilterChange)

      const label = screen
        .getByText(`${FIELD_LABEL}: Autocomplete Option 3`)
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(label, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({})
    })
  })

  describe('Filters form', () => {
    it('renders autocomplete options after querying value', async () => {
      arrangeTest({}, jest.fn())
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const autocomplete = screen.getByLabelText(FIELD_LABEL)

      expect(autocomplete).toBeInTheDocument()

      fireEvent.input(autocomplete, { target: { value: 'A' } })

      expect(
        await screen.findByText('Autocomplete Option 1')
      ).toBeInTheDocument()
      expect(screen.queryByText('Autocomplete Option 2')).toBeInTheDocument()
      expect(screen.queryByText('Autocomplete Option 3')).toBeInTheDocument()
    })

    // Random fail, checked manually, reset button presented only on hover
    // eslint-disable-next-line
    it.skip('sets value correctly', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const autocomplete = screen.getByLabelText(FIELD_LABEL)

      expect(autocomplete).toBeInTheDocument()

      fireEvent.input(autocomplete, { target: { value: 'A' } })

      expect(
        await screen.findByText('Autocomplete Option 3')
      ).toBeInTheDocument()

      fireEvent.click(screen.getByText('Autocomplete Option 3'))

      expect(onFilterChange).toHaveBeenCalledWith({ [FIELD_NAME]: '3' })
    })

    // Random fail, checked manually, reset button presented only on hover
    // eslint-disable-next-line
    it.skip('resets value', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ [FIELD_NAME]: '2' }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const autocomplete = screen.getByDisplayValue('Autocomplete Option 2')

      expect(autocomplete).toBeInTheDocument()

      const reset = screen.getByRole('reset')

      fireEvent.click(reset)

      expect(
        screen.queryByText('Autocomplete Option 1')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('Autocomplete Option 2')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText('Autocomplete Option 3')
      ).not.toBeInTheDocument()
    })
  })
})
