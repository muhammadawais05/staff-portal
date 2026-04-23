import React from 'react'
import { render, screen, getByText, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters from '../Filters'
import { SortOrder, SortOption } from '../../../types'

const TEST_SORT_OPTIONS: SortOption[] = [
  {
    text: 'Created at',
    value: 'created_at'
  },
  {
    text: 'Applied at',
    value: 'applied_at',
    defaultSort: SortOrder.ASC
  }
]

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void
) =>
  render(
    <TestWrapper>
      <Filters
        sortOptions={TEST_SORT_OPTIONS}
        values={values}
        onChange={onFiltersChange}
      />
    </TestWrapper>
  )

describe('Sorting', () => {
  describe('sorting value is NOT provided', () => {
    it('shows the sorting button with default sorting option selected', () => {
      arrangeTest({}, jest.fn())

      const sortByButton = screen.getByRole('button', { name: 'Sort by' })

      expect(sortByButton).toHaveTextContent('Applied At')
    })

    it('shows sort order button with default sorting order', () => {
      arrangeTest({}, jest.fn())

      expect(
        screen.getByRole('button', { name: 'Sort Order asc' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Sort Order desc' })
      ).toBeNull()
    })

    it('allows to toggle sorting order', () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)
      fireEvent.click(screen.getByRole('button', { name: 'Sort Order asc' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        sort: {
          target: 'applied_at',
          order: SortOrder.DESC
        }
      })
    })

    it('allows selecting another sorting option', () => {
      const onFilterChange = jest.fn()

      arrangeTest({}, onFilterChange)
      fireEvent.click(screen.getByRole('button', { name: 'Sort by' }))

      const dropdownMenu = screen.getByRole('menu')

      fireEvent.click(getByText(dropdownMenu, 'Created At'))

      expect(onFilterChange).toHaveBeenCalledWith({
        sort: {
          target: 'created_at',
          order: SortOrder.ASC
        }
      })
    })
  })

  describe('sorting value IS provided', () => {
    it('shows the sorting button with provided sorting option selected', () => {
      arrangeTest(
        { sort: { target: 'created_at', order: SortOrder.DESC } },
        jest.fn()
      )

      const sortByButton = screen.getByRole('button', { name: 'Sort by' })

      expect(sortByButton).toHaveTextContent('Created At')
    })

    it('shows the sort order button with provided sorting order', () => {
      arrangeTest(
        { sort: { target: 'created_at', order: SortOrder.DESC } },
        jest.fn()
      )

      expect(
        screen.getByRole('button', { name: 'Sort Order desc' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Sort Order asc' })
      ).toBeNull()
    })

    it('allows to toggle sorting order', () => {
      const onFilterChange = jest.fn()

      arrangeTest(
        { sort: { target: 'created_at', order: SortOrder.DESC } },
        onFilterChange
      )
      fireEvent.click(screen.getByRole('button', { name: 'Sort Order desc' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        sort: {
          target: 'created_at',
          order: SortOrder.ASC
        }
      })
    })

    it('allows selecting another sorting option', () => {
      const onFilterChange = jest.fn()

      arrangeTest(
        { sort: { target: 'created_at', order: SortOrder.DESC } },
        onFilterChange
      )
      fireEvent.click(screen.getByRole('button', { name: 'Sort by' }))

      const dropdownMenu = screen.getByRole('menu')

      fireEvent.click(getByText(dropdownMenu, 'Applied At'))

      expect(onFilterChange).toHaveBeenCalledWith({
        sort: {
          target: 'applied_at',
          order: SortOrder.ASC
        }
      })
    })
  })

  describe('wrong sorting value is provided', () => {
    it('shows the default values', () => {
      arrangeTest(
        { sort: { target: 'wrong_target', order: 'wrong_order' } },
        jest.fn()
      )

      const sortByButton = screen.getByRole('button', { name: 'Sort by' })

      expect(sortByButton).toHaveTextContent('Applied At')

      expect(
        screen.getByRole('button', { name: 'Sort Order asc' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Sort Order desc' })
      ).toBeNull()
    })

    it('shows the default target', () => {
      arrangeTest(
        { sort: { target: 'wrong_target', order: SortOrder.DESC } },
        jest.fn()
      )

      const sortByButton = screen.getByRole('button', { name: 'Sort by' })

      expect(sortByButton).toHaveTextContent('Applied At')

      expect(
        screen.getByRole('button', { name: 'Sort Order desc' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Sort Order asc' })
      ).toBeNull()
    })

    it('shows the default order', () => {
      arrangeTest(
        { sort: { target: 'created_at', order: 'wrong_order' } },
        jest.fn()
      )

      const sortByButton = screen.getByRole('button', { name: 'Sort by' })

      expect(sortByButton).toHaveTextContent('Created At')

      expect(
        screen.getByRole('button', { name: 'Sort Order asc' })
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Sort Order desc' })
      ).toBeNull()
    })
  })
})
