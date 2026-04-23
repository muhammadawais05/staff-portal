import { fireEvent, getByRole, render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters from '../Filters'
import { FilterConfigType } from '../../../types'
import { FiltersConfig } from '../types'

const FIELD_LABEL = 'Preset'
const FIELD_NAME = 'test_preset'

const TEST_FILTER_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.PRESET,
    name: FIELD_NAME,
    label: FIELD_LABEL,
    options: [
      {
        label: 'Toptal payments',
        key: 'toptalPayments',
        values: [
          {
            filter: 'preferred_payment_methods',
            value: ['TOPTAL_PAYMENTS']
          }
        ]
      },
      {
        label: 'Payoneer',
        key: 'payoneer',
        values: [
          {
            filter: 'preferred_payment_methods',
            value: ['PAYONEER']
          }
        ]
      },
      {
        label: 'Staff commissions',
        key: 'staffCommissions',
        values: [
          {
            filter: 'statuses',
            value: ['DUE', 'OVERDUE']
          },
          { filter: 'payee_roles', value: ['STAFF'] }
        ]
      }
    ]
  }
]

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void
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

describe('Preset filter', () => {
  describe('Filters selection', () => {
    it('renders selected preset', () => {
      arrangeTest({ [FIELD_NAME]: 'toptalPayments' }, jest.fn())

      expect(
        screen.getByText(`${FIELD_LABEL}: Toptal Payments`)
      ).toBeInTheDocument()
    })

    it('allows removing preset filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ [FIELD_NAME]: 'staffCommissions' }, onFilterChange)

      const label = screen
        .getByText(`${FIELD_LABEL}: Staff Commissions`)
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(label, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({})
    })
  })

  describe('Filters form', () => {
    it('renders preset filter properly', () => {
      arrangeTest({ [FIELD_NAME]: 'toptalPayments' }, jest.fn())
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      expect(screen.getByDisplayValue('toptalPayments')).toHaveAttribute(
        'checked'
      )
      expect(screen.getByDisplayValue('payoneer')).not.toHaveAttribute(
        'checked'
      )
      expect(screen.getByDisplayValue('staffCommissions')).not.toHaveAttribute(
        'checked'
      )
    })

    it('sets filter when checking another preset radio button', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ [FIELD_NAME]: 'toptalPayments' }, onFilterChange)
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      fireEvent.click(screen.getByText('Staff commissions'))

      expect(onFilterChange).toHaveBeenCalledWith({
        [FIELD_NAME]: 'staffCommissions',
        payee_roles: ['STAFF'],
        statuses: ['DUE', 'OVERDUE']
      })
    })
  })
})
