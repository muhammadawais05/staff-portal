import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

const CHECKBOX_OPTIONS = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' }
]

const TEST_FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.CHECKBOX,
    name: 'testList',
    label: 'Checkboxes Filter',
    options: CHECKBOX_OPTIONS
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

describe('Checkboxes filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest({ testList: ['1', '3'] }, jest.fn())

      expect(
        screen.getByText('Checkboxes Filter: Option 1')
      ).toBeInTheDocument()
      expect(screen.queryByText('Checkboxes Filter: Option 2')).toBeNull()
      expect(
        screen.getByText('Checkboxes Filter: Option 3')
      ).toBeInTheDocument()
    })

    it('allows removing checkbox filters from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ testList: ['1', '3'] }, onFilterChange)

      const label = screen
        .getByText('Checkboxes Filter: Option 1')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(label, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        testList: ['3']
      })
    })
  })

  describe('Filters form', () => {
    it('renders checkboxes list for provided options', async () => {
      arrangeTest({ testList: ['2'] }, jest.fn())
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      expect(screen.getByDisplayValue('1')).not.toHaveAttribute('checked')
      expect(screen.getByDisplayValue('2')).toHaveAttribute('checked')
      expect(screen.getByDisplayValue('3')).not.toHaveAttribute('checked')
    })

    it('sets group filter value when checking checkbox', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({ testList: ['1'] }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      fireEvent.click(screen.getByText('Option 3'))

      expect(onFilterChange).toHaveBeenCalledWith({ testList: ['1', '3'] })
    })

    it('unsets group filter value when unchecking checkbox', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({ testList: ['1'] }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      fireEvent.click(screen.getByText('Option 1'))

      expect(onFilterChange).toHaveBeenCalledWith({})
    })
  })
})
