import React from 'react'
import { render, screen, getByRole, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  DEFAULT_ISO_DATE_PLACEHOLDER,
  startOfMonth,
  addDays,
  format
} from '@staff-portal/date-time-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

const startOfTheCurrentMonth = startOfMonth(new Date())
const MONTH_FIRST_DAY_DATE = format(startOfTheCurrentMonth, 'yyyy-MM-dd')
const MONTH_SECOND_DAY_DATE = format(
  addDays(startOfTheCurrentMonth, 1),
  'yyyy-MM-dd'
)
const TEST_FILTERS_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.DATE_RANGE,
    name: 'date',
    label: 'Date'
  }
]

const arrangeTest = ({
  values,
  onFiltersChange,
  config = TEST_FILTERS_CONFIG
}: {
  values: Record<string, unknown>
  onFiltersChange: (values: Record<string, unknown>) => void
  config?: FiltersConfig
}) =>
  render(
    <TestWrapper>
      <Filters config={config} values={values} onChange={onFiltersChange} />
    </TestWrapper>
  )

describe('DateRange filter', () => {
  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest({
        values: {
          date: {
            from: MONTH_FIRST_DAY_DATE,
            till: MONTH_SECOND_DAY_DATE
          }
        },
        onFiltersChange: jest.fn()
      })

      expect(
        screen.getByText(`Date (From): ${MONTH_FIRST_DAY_DATE}`)
      ).toBeInTheDocument()
      expect(
        screen.getByText(`Date (To): ${MONTH_SECOND_DAY_DATE}`)
      ).toBeInTheDocument()
    })

    it('allows removing date range FROM filter from the list', () => {
      const onFiltersChange = jest.fn()

      arrangeTest({
        values: {
          date: { from: MONTH_FIRST_DAY_DATE, till: MONTH_SECOND_DAY_DATE }
        },
        onFiltersChange
      })

      const fromLabel = screen
        .getByText(`Date (From): ${MONTH_FIRST_DAY_DATE}`)
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(fromLabel, 'button', { name: 'delete icon' }))

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {
          till: MONTH_SECOND_DAY_DATE
        }
      })
    })

    it('allows removing date range TILL filter from the list', () => {
      const onFiltersChange = jest.fn()

      arrangeTest({
        values: {
          date: { from: MONTH_FIRST_DAY_DATE, till: MONTH_SECOND_DAY_DATE }
        },
        onFiltersChange
      })

      const tillLabel = screen
        .getByText(`Date (To): ${MONTH_SECOND_DAY_DATE}`)
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(tillLabel, 'button', { name: 'delete icon' }))

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {
          from: MONTH_FIRST_DAY_DATE
        }
      })
    })

    it('should not allow to select a future date', async () => {
      const onFiltersChange = jest.fn()
      const MONTH_TENTH_DAY = addDays(startOfTheCurrentMonth, 9)
      const MONTH_TENTH_DAY_DATE = format(MONTH_TENTH_DAY, 'yyyy-MM-dd')

      arrangeTest({
        values: {
          date: { from: MONTH_FIRST_DAY_DATE, till: MONTH_TENTH_DAY_DATE }
        },
        onFiltersChange,
        config: [
          {
            type: FilterConfigType.DATE_RANGE,
            name: 'sent_at',
            label: 'Sent at',
            options: {
              maxDate: MONTH_TENTH_DAY
            }
          }
        ]
      })

      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const filterFrom = await screen.findByTestId('filters-date-from')

      fireEvent.click(filterFrom)

      const day11 = screen.getByText(/11/)

      fireEvent.click(day11)

      expect(onFiltersChange).toHaveBeenCalledTimes(0)
    })
  })

  describe('Filters form', () => {
    it('should set from and till values using dropdown Calendar', async () => {
      const onFiltersChange = jest.fn()

      const DAY_TO_TEST_FROM = '1'
      const DAY_TO_TEST_TO = '2'

      arrangeTest({ values: { date: null }, onFiltersChange })
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const inputFrom = screen.getAllByPlaceholderText(
        DEFAULT_ISO_DATE_PLACEHOLDER
      )[0]

      inputFrom.focus()
      fireEvent.click(screen.getAllByText(DAY_TO_TEST_FROM)[0])

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {
          from: MONTH_FIRST_DAY_DATE
        }
      })

      const inputTo = screen.getAllByPlaceholderText(
        DEFAULT_ISO_DATE_PLACEHOLDER
      )[1]

      inputTo.focus()
      fireEvent.click(screen.getAllByText(DAY_TO_TEST_TO)[0])

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {
          till: MONTH_SECOND_DAY_DATE
        }
      })
    })

    // Random fail, checked manually, reset button presented only on hover
    // eslint-disable-next-line
    it.skip('should unset value by pressing the Reset button in Date picker', async () => {
      const FROM_VALUE = '2020-11-11'
      const onFiltersChange = jest.fn()

      arrangeTest({ values: { date: { from: FROM_VALUE } }, onFiltersChange })
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const resetButtons = screen.getAllByRole('reset')

      fireEvent.click(resetButtons[0])

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {}
      })
    })

    it('should unset value by manually clearing the input', async () => {
      const FROM_VALUE = '2020-10-10'
      const onFiltersChange = jest.fn()

      arrangeTest({ values: { date: { from: FROM_VALUE } }, onFiltersChange })
      fireEvent.click(screen.getByTestId('toggle-filters-form'))

      const inputFrom = screen.getByDisplayValue(FROM_VALUE)

      inputFrom.focus()
      fireEvent.change(inputFrom, { target: { value: '' } })
      fireEvent.mouseOut(inputFrom)

      expect(onFiltersChange).toHaveBeenCalledWith({
        date: {
          from: null
        }
      })
    })
  })
})
