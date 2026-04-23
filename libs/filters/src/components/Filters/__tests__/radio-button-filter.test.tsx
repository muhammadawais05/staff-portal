import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

const RADIO_OPTIONS = [
  { label: 'Radio 1', value: '1' },
  { label: 'Radio 2', value: '2' },
  { label: 'Radio 3', value: '3' }
]

const TEST_FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.RADIO,
    name: 'radioFilter',
    label: 'Radio Filter',
    options: RADIO_OPTIONS
  }
]

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void
) =>
  render(
    <TestWrapper>
      <Filters
        config={TEST_FILTERS_CONFIG}
        values={values}
        onChange={onFiltersChange}
      />
    </TestWrapper>
  )

describe('Radio buttons filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest({ radioFilter: '2' }, jest.fn())

      expect(screen.queryByText('Radio Filter: Radio 1')).toBeNull()
      expect(screen.getByText('Radio Filter: Radio 2')).toBeInTheDocument()
      expect(screen.queryByText('Radio Filter: Radio 3')).toBeNull()
    })

    it('allows removing radio button filters from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ radioFilter: '2' }, onFilterChange)

      const label = screen
        .getByText('Radio Filter: Radio 2')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(label, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({})
    })
  })

  describe('Filters form', () => {
    it('renders radio buttons', () => {
      arrangeTest({ radioFilter: '2' }, jest.fn())
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      expect(screen.getByDisplayValue('1')).not.toHaveAttribute('checked')
      expect(screen.getByDisplayValue('2')).toHaveAttribute('checked')
      expect(screen.getByDisplayValue('3')).not.toHaveAttribute('checked')
    })

    it('sets filter when checking another radio button', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ radioFilter: '1' }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      fireEvent.click(screen.getByText('Radio 3'))

      expect(onFilterChange).toHaveBeenCalledWith({ radioFilter: '3' })
    })
  })
})
