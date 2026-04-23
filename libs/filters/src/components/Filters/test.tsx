import React from 'react'
import {
  render,
  screen,
  fireEvent,
  getByTestId,
  getByRole
} from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters from './Filters'
import FiltersHeader from './FiltersHeader'
import FiltersContent from './FiltersContent'
import FiltersWithoutHeader from './FiltersWithoutHeader'
import { TEST_FILTERS_CONFIG, TEST_SORT_OPTIONS } from './test.config'
import { SortOption } from '../../types'
import { FiltersContextProvider } from './FiltersContext'

describe('Filters', () => {
  const arrangeTest = ({ sortOptions }: { sortOptions?: SortOption[] } = {}) =>
    render(
      <TestWrapper>
        <Filters config={TEST_FILTERS_CONFIG} sortOptions={sortOptions} />
      </TestWrapper>
    )

  it('renders filter selection by default', () => {
    arrangeTest()
    expect(screen.getByTestId('filters-header')).toBeInTheDocument()
    expect(screen.getByTestId('filters-selection')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-form')).toBeNull()
  })

  it('expands filter form when clicking "toggle filters" button, hides filters selection', () => {
    arrangeTest()
    fireEvent.click(screen.getByTestId('toggle-filters-form'))

    expect(screen.queryByTestId('filters-selection')).toBeNull()
    expect(screen.getByTestId('filters-form')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('toggle-filters-form'))
    expect(screen.getByTestId('filters-selection')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-form')).toBeNull()
  })

  it('allows injecting FilterHeader controls inside provided children', () => {
    render(
      <TestWrapper>
        <Filters config={TEST_FILTERS_CONFIG} sortOptions={TEST_SORT_OPTIONS}>
          {nestableControls => (
            <div data-testid='nestable-controls-wrapper'>
              {nestableControls}
            </div>
          )}
        </Filters>
      </TestWrapper>
    )

    const nestedControlsWrapper = screen.getByTestId(
      'nestable-controls-wrapper'
    )

    expect(nestedControlsWrapper).toBeInTheDocument()
    expect(
      getByTestId(nestedControlsWrapper, 'toggle-filters-form')
    ).toBeInTheDocument()
    expect(
      getByRole(nestedControlsWrapper, 'button', { name: 'Sort by' })
    ).toBeInTheDocument()

    expect(
      getByTestId(nestedControlsWrapper, 'filters-header')
    ).toBeInTheDocument()
  })

  describe('sorting options', () => {
    it('does NOT render sorting options if they are NOT provided', () => {
      arrangeTest()
      expect(screen.queryByRole('button', { name: 'Sort by' })).toBeNull()
    })

    it('renders sorting options if they are provided', () => {
      arrangeTest({ sortOptions: TEST_SORT_OPTIONS })
      expect(
        screen.getByRole('button', { name: 'Sort by' })
      ).toBeInTheDocument()
    })
  })
})

describe('FiltersHeader stand-alone usage', () => {
  it('renders filters header', () => {
    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          setFilterValues={jest.fn()}
          config={[]}
        >
          <FiltersHeader hasFiltersExpanded setHasFilterExpanded={jest.fn()} />
        </FiltersContextProvider>
      </TestWrapper>
    )
    expect(screen.getByTestId('filters-header')).toBeInTheDocument()
  })

  it('allows to handle filters toggling', () => {
    const handleFilterToggle = jest.fn()

    const { rerender } = render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          setFilterValues={jest.fn()}
          config={[]}
        >
          <FiltersHeader
            hasFiltersExpanded
            setHasFilterExpanded={handleFilterToggle}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )

    fireEvent.click(screen.getByTestId('toggle-filters-form'))
    expect(handleFilterToggle).toHaveBeenCalledWith(false)

    rerender(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          setFilterValues={jest.fn()}
          config={[]}
        >
          <FiltersHeader
            hasFiltersExpanded={false}
            setHasFilterExpanded={handleFilterToggle}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )

    fireEvent.click(screen.getByTestId('toggle-filters-form'))
    expect(handleFilterToggle).toHaveBeenCalledWith(true)
  })

  it('does NOT render sorting options if they are NOT provided', () => {
    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          setFilterValues={jest.fn()}
          config={[]}
        >
          <FiltersHeader hasFiltersExpanded setHasFilterExpanded={jest.fn()} />
        </FiltersContextProvider>
      </TestWrapper>
    )
    expect(screen.queryByRole('button', { name: 'Sort by' })).toBeNull()
  })

  it('renders sorting options if they are provided', () => {
    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          setFilterValues={jest.fn()}
          config={[]}
        >
          <FiltersHeader
            hasFiltersExpanded
            setHasFilterExpanded={jest.fn()}
            sortOptions={TEST_SORT_OPTIONS}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )
    expect(screen.getByRole('button', { name: 'Sort by' })).toBeInTheDocument()
  })
})

describe('FiltersContent stand-alone usage', () => {
  it('renders filter selection by default', () => {
    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={jest.fn()}
        >
          <FiltersContent
            hasFiltersExpanded={false}
            config={TEST_FILTERS_CONFIG}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )
    expect(screen.getByTestId('filters-selection')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-form')).toBeNull()
  })

  it('allows toggling filter form with `hasFilterExpanded` prop', () => {
    const { rerender } = render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={jest.fn()}
        >
          <FiltersContent hasFiltersExpanded config={TEST_FILTERS_CONFIG} />
        </FiltersContextProvider>
      </TestWrapper>
    )

    expect(screen.queryByTestId('filters-selection')).toBeNull()
    expect(screen.getByTestId('filters-form')).toBeInTheDocument()

    rerender(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{}}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={jest.fn()}
        >
          <FiltersContent
            hasFiltersExpanded={false}
            config={TEST_FILTERS_CONFIG}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )

    expect(screen.getByTestId('filters-selection')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-form')).toBeNull()
  })

  it('allows handling filter changes', () => {
    const onFilterChange = jest.fn()

    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{ checkboxesFilter: ['Checkbox 2'] }}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={onFilterChange}
        >
          <FiltersContent hasFiltersExpanded config={TEST_FILTERS_CONFIG} />
        </FiltersContextProvider>
      </TestWrapper>
    )

    fireEvent.click(screen.getByDisplayValue('Checkbox 2'))

    expect(onFilterChange).toHaveBeenCalledWith({})

    fireEvent.click(screen.getByDisplayValue('Checkbox 3'))
    expect(onFilterChange).toHaveBeenCalledWith({
      checkboxesFilter: ['Checkbox 2', 'Checkbox 3']
    })
  })

  describe('When `to` is an empty string', () => {
    it('amount range does not trigger error', () => {
      render(
        <TestWrapper>
          <FiltersContextProvider
            filterValues={{}}
            config={TEST_FILTERS_CONFIG}
            setFilterValues={jest.fn()}
          >
            <FiltersContent hasFiltersExpanded config={TEST_FILTERS_CONFIG} />
          </FiltersContextProvider>
        </TestWrapper>
      )

      const fromInput = () => screen.getByTestId(`amountRangeFilter.from`)
      const toInput = () => screen.getByTestId(`amountRangeFilter.to`)

      expect(fromInput()).toHaveAttribute('value', '')
      expect(toInput()).toHaveAttribute('value', '')

      fireEvent.change(fromInput(), { target: { value: '5' } })
      fireEvent.change(toInput(), { target: { value: '3' } })

      expect(fromInput()).toHaveAttribute('aria-invalid', 'true')
      expect(toInput()).toHaveAttribute('aria-invalid', 'true')

      fireEvent.change(toInput(), { target: { value: '' } })

      expect(fromInput()).toHaveAttribute('aria-invalid', 'false')
      expect(fromInput()).toHaveAttribute('aria-invalid', 'false')
    })
  })

  it('Preset switch will not touch search input, but will clear other filters', () => {
    const onFilterChange = jest.fn()

    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{
            badges: ['123'],
            checkboxesFilter: ['Checkbox 2'],
            selectFilter: '2'
          }}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={onFilterChange}
        >
          <FiltersContent hasFiltersExpanded config={TEST_FILTERS_CONFIG} />
        </FiltersContextProvider>
      </TestWrapper>
    )

    fireEvent.click(screen.getByLabelText('Preset 1'))

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: ['123'],
      foo: 'bar',
      presetFilter: 'preset1'
    })

    fireEvent.click(screen.getByLabelText('Default'))

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: ['123'],
      foo: 'bar',
      presetFilter: 'preset1'
    })
  })

  it('Preset cancel will clear all filters except search input', () => {
    const onFilterChange = jest.fn()

    render(
      <TestWrapper>
        <FiltersContextProvider
          filterValues={{
            badges: ['123'],
            checkboxesFilter: ['Checkbox 2'],
            selectFilter: '2',
            presetFilter: 'preset1',
            foo: 'bar'
          }}
          config={TEST_FILTERS_CONFIG}
          setFilterValues={onFilterChange}
        >
          <FiltersContent
            hasFiltersExpanded={false}
            config={TEST_FILTERS_CONFIG}
          />
        </FiltersContextProvider>
      </TestWrapper>
    )

    const resetButton = screen
      .queryByText('Preset Filter: Preset 1')
      ?.closest('[role="button"]')
      ?.querySelector(
        '[role="button"][aria-label="delete icon"]'
      ) as HTMLElement

    expect(resetButton).toBeInTheDocument()
    fireEvent.click(resetButton)

    expect(onFilterChange).toHaveBeenCalledWith({
      badges: ['123'],
      foo: 'bar'
    })
  })
})

describe('FiltersWithoutHeader usage', () => {
  it('renders FiltersContent form', () => {
    render(
      <TestWrapper>
        <FiltersWithoutHeader
          values={{}}
          config={TEST_FILTERS_CONFIG}
          onChange={jest.fn()}
        />
      </TestWrapper>
    )
    expect(screen.getByTestId('filters-form')).toBeInTheDocument()
    expect(screen.queryByTestId('filters-selection')).toBeNull()
    expect(screen.queryByTestId('filters-header')).toBeNull()
  })
})
