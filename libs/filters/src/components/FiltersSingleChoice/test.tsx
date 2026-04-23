import React from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'

import FiltersSingleChoice, { SingleChoiceType } from '.'
import { RadioFilterConfigOptions, SelectFilterConfigOptions } from '..'
import {
  CommonFilterConfig,
  DateRangeFilterConfig,
  FilterConfig,
  FiltersContextProvider
} from '../Filters'
import { FilterConfigType } from '../../types'

const arrangeTest = ({
  name = '',
  label = '',
  options = [],
  subFilter,
  enableReset,
  type,
  filterValues = {}
}: {
  type?: SingleChoiceType
  name?: string
  label?: string
  options?: RadioFilterConfigOptions | SelectFilterConfigOptions
  subFilter?: FilterConfig
  enableReset?: boolean
  filterValues?: Record<string, unknown>
}) =>
  render(
    <TestWrapper>
      <FiltersContextProvider
        filterValues={filterValues}
        setFilterValues={jest.fn()}
        config={[]}
      >
        <FiltersSingleChoice
          type={type}
          name={name}
          label={label}
          options={options}
          subFilter={subFilter}
          enableReset={enableReset}
        />
      </FiltersContextProvider>
    </TestWrapper>
  )

describe('FiltersSingleChoice', () => {
  describe('sub section', () => {
    it('should show if available', () => {
      const { queryByTestId } = arrangeTest({
        subFilter: {
          type: FilterConfigType.DATE_RANGE
        } as DateRangeFilterConfig & CommonFilterConfig
      })

      expect(queryByTestId('filters-date-from')).toBeInTheDocument()
      expect(queryByTestId('filters-date-till')).toBeInTheDocument()
    })

    it('should not show if unavailable', () => {
      const { queryByTestId } = arrangeTest({})

      expect(queryByTestId('filters-date-from')).not.toBeInTheDocument()
      expect(queryByTestId('filters-date-till')).not.toBeInTheDocument()
    })
  })

  describe('Select filter', () => {
    it('should show reset button when reset is enabled', () => {
      const options = [
        { label: 'option 1', value: '1' },
        { label: 'option 2', value: '2' }
      ]
      const { queryByTestId } = arrangeTest({
        type: 'select',
        name: 'test',
        filterValues: { test: '1' },
        options,
        enableReset: true
      })

      expect(queryByTestId('reset-adornment')).toBeInTheDocument()
    })

    it('should not show reset button when reset is not enabled', () => {
      const options = [
        { label: 'option 1', value: '1' },
        { label: 'option 2', value: '2' }
      ]
      const { queryByTestId } = arrangeTest({
        type: 'select',
        name: 'test',
        filterValues: { test: '1' },
        options,
        enableReset: false
      })

      expect(queryByTestId('reset-adornment')).not.toBeInTheDocument()
    })
  })
})
