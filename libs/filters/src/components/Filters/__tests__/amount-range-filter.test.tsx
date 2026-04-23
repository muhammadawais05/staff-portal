import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

const FIELD_LABEL = 'Amount'
const FIELD_NAME = 'amount'

const TEST_FILTER_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.AMOUNT_RANGE,
    name: FIELD_NAME,
    label: FIELD_LABEL
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

describe('Amount range filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest(
        {
          amount: {
            from: '10',
            till: '15'
          }
        },
        jest.fn()
      )

      expect(screen.getByText('Amount (From): 10')).toBeInTheDocument()
      expect(screen.getByText('Amount (To): 15')).toBeInTheDocument()
    })

    it('allows removing amount range FROM filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ amount: { from: '10', till: '90' } }, onFilterChange)

      const fromLabel = screen
        .getByText('Amount (From): 10')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(fromLabel, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        amount: {
          till: '90'
        }
      })
    })

    it('allows removing amount range TILL filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ amount: { from: '10', till: '90' } }, onFilterChange)

      const tillLabel = screen
        .getByText('Amount (To): 90')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(tillLabel, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        amount: {
          from: '10'
        }
      })
    })
  })

  describe('Filters form', () => {
    it('shows the amount label', () => {
      arrangeTest({ amount: { from: '10', till: '15' } })
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      expect(screen.getByText(FIELD_LABEL)).toBeInTheDocument()
    })

    it('shows the amount filters', () => {
      arrangeTest({ amount: { from: '10', till: '15' } })
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      expect(screen.getByDisplayValue('10')).toBeInTheDocument()
      expect(screen.getByDisplayValue('15')).toBeInTheDocument()
    })

    it('sets the amount filters', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ amount: { from: '10', till: '15' } }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const fromInput = screen.getByDisplayValue('10')

      fireEvent.change(fromInput, { target: { value: '7' } })
      fireEvent.blur(fromInput, { target: { value: '7' } })

      expect(onFilterChange).toHaveBeenCalledWith({
        amount: {
          from: '7.00',
          till: '15'
        }
      })
    })

    // Random fail, checked manually, reset button presented only on hover
    // eslint-disable-next-line
    it.skip('resets the amount filters', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ amount: { from: '10', till: '15' } }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      fireEvent.click(screen.getAllByRole('reset')[0])

      expect(onFilterChange).toHaveBeenCalledWith({
        amount: {
          from: '',
          till: '15'
        }
      })
    })
  })
})
