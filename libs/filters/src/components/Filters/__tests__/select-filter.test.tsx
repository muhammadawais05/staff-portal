import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

const SELECT_OPTIONS = [
  { label: 'Select Option 1', value: '1' },
  { label: 'Select Option 2', value: '2' },
  { label: 'Select Option 3', value: '3' },
  { label: 'Empty Select Option', value: '' }
]

const TEST_FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.SELECT,
    name: 'selectFilter',
    label: 'Select Filter',
    options: SELECT_OPTIONS
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

describe('Select filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest({ selectFilter: '3' }, jest.fn())

      expect(screen.queryByText('Select Filter: Select Option 1')).toBeNull()
      expect(screen.queryByText('Select Filter: Select Option 2')).toBeNull()
      expect(
        screen.getByText('Select Filter: Select Option 3')
      ).toBeInTheDocument()
    })

    describe('when option with empty value is selected', () => {
      it('does not render option in filters content', () => {
        arrangeTest({ selectFilter: '' }, jest.fn())

        expect(
          screen.queryByText('Select Filter: Empty Select Option')
        ).not.toBeInTheDocument()
      })
    })

    it('allows removing select filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ selectFilter: '3' }, onFilterChange)

      const label = screen
        .getByText('Select Filter: Select Option 3')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(label, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({})
    })
  })

  describe('Filters form', () => {
    it('renders select', () => {
      arrangeTest({ selectFilter: '2' }, jest.fn())
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const select = screen.getByDisplayValue('Select Option 2')

      expect(select).toBeInTheDocument()

      fireEvent.click(select)

      expect(screen.getByText('Select Option 1').closest('li')).toHaveAttribute(
        'aria-selected',
        'false'
      )
      expect(screen.getByText('Select Option 2').closest('li')).toHaveAttribute(
        'aria-selected',
        'true'
      )
      expect(screen.getByText('Select Option 3').closest('li')).toHaveAttribute(
        'aria-selected',
        'false'
      )
    })

    describe('when another value is selected', () => {
      it('sets filter', () => {
        const onFilterChange = jest.fn()

        arrangeTest({ selectFilter: '2' }, onFilterChange)
        fireEvent.click(screen.getByTestId('toggle-filters-form'))

        const select = screen.getByDisplayValue('Select Option 2')

        expect(select).toBeInTheDocument()

        fireEvent.click(select)
        fireEvent.click(screen.getByText('Select Option 3'))

        expect(onFilterChange).toHaveBeenCalledWith({ selectFilter: '3' })
      })
    })
  })
})
