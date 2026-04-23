import React, { ComponentProps } from 'react'
import {
  act,
  render,
  screen,
  getByRole,
  fireEvent
} from '@testing-library/react'
import PicassoSlider from '@toptal/picasso/Slider'
import { TestWrapper } from '@staff-portal/test-utils'

import Filters, { FiltersConfig } from '../../Filters'
import { FilterConfigType } from '../../../types'

jest.mock('@toptal/picasso/Slider', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/Slider'),
  default: jest.fn()
}))

const MIN_LABEL = 'Min Label'
const MAX_LABEL = 'Max Label'
const TEST_CONFIG: FiltersConfig = [
  {
    type: FilterConfigType.SLIDER_RANGE,
    name: 'slider',
    label: 'Slider',
    options: {
      min: 0,
      max: 100,
      step: 10,
      minLabel: MIN_LABEL,
      maxLabel: MAX_LABEL
    }
  }
]

const TEST_CONFIG_WITH_CUSTOM_PROP_NAMES: FiltersConfig = [
  {
    type: FilterConfigType.SLIDER_RANGE,
    name: 'slider',
    label: 'Slider',
    options: {
      min: 0,
      max: 100,
      step: 10,
      minLabel: MIN_LABEL,
      maxLabel: MAX_LABEL,
      fromPropertyName: 'min',
      tillPropertyName: 'max'
    }
  }
]

const MockedSlider = ({
  onChange,
  value,
  step
}: ComponentProps<typeof PicassoSlider>) => {
  const [from, till] = value as number[]
  const handleChange = onChange!
  const _step = step!

  return (
    <div>
      <div
        data-testid='increase-from-value'
        onClick={e => handleChange(e, [from + _step, till])}
      />
      <div
        data-testid='decrease-till-value'
        onClick={e => handleChange(e, [from, till - _step])}
      />
    </div>
  )
}

const Slider: ReturnType<typeof jest.fn> = PicassoSlider as any // eslint-disable-line

const arrangeTest = (
  values: Record<string, unknown>,
  onFiltersChange: (values: Record<string, unknown>) => void,
  config: FiltersConfig = TEST_CONFIG
) =>
  render(
    <TestWrapper>
      <Filters config={config} values={values} onChange={onFiltersChange} />
    </TestWrapper>
  )

describe('Range slider filter', () => {
  beforeEach(() => {
    jest.useFakeTimers() // some debouncing happens inside
    Slider.mockImplementation(MockedSlider)
  })

  describe('Filters selection', () => {
    it('renders selected filters', () => {
      arrangeTest(
        { slider: { min: 10, max: 90 } },
        jest.fn(),
        TEST_CONFIG_WITH_CUSTOM_PROP_NAMES
      )

      expect(screen.getByText('Slider (Min): 10')).toBeInTheDocument()
      expect(screen.getByText('Slider (Max): 90')).toBeInTheDocument()
    })

    it('allows removing slider range FROM filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ slider: { from: 20, till: 80 } }, onFilterChange)

      const fromLabel = screen
        .getByText('Slider (From): 20')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(fromLabel, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: {
          till: 80
        }
      })
    })

    it('allows removing slider range TILL filter from the list', () => {
      const onFilterChange = jest.fn()

      arrangeTest({ slider: { from: 20, till: 80 } }, onFilterChange)

      const tillLabel = screen
        .getByText('Slider (To): 80')
        .closest<HTMLElement>('[role="button"]')!

      fireEvent.click(getByRole(tillLabel, 'button', { name: 'delete icon' }))

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: {
          from: 20
        }
      })
    })
  })

  describe('Filters form', () => {
    it('renders min and max labels', async () => {
      arrangeTest({ slider: { from: 10, till: 90 } }, jest.fn())

      await act(async () => {
        fireEvent.click(screen.getByTestId('toggle-filters-form'))
      })

      expect(screen.getByText(MIN_LABEL)).toBeInTheDocument()
      expect(screen.getByText(MAX_LABEL)).toBeInTheDocument()
    })

    it('renders slider with provided range', async () => {
      arrangeTest({ slider: { from: 10, till: 90 } }, jest.fn())

      await act(async () => {
        fireEvent.click(screen.getByTestId('toggle-filters-form'))
      })

      const lastCallArgs = Slider.mock.calls[Slider.mock.calls.length - 1]

      expect(lastCallArgs[0]).toMatchObject({
        min: 0,
        max: 100,
        step: 10,
        value: [10, 90],
        tooltip: 'on'
      })
    })

    it('sets from and till values when they are changed', async () => {
      const onFilterChange = jest.fn()

      arrangeTest({ slider: { from: 10, till: 90 } }, onFilterChange)

      await act(async () => {
        fireEvent.click(screen.getByTestId('toggle-filters-form'))
      })

      await act(async () => {
        fireEvent.click(screen.getByTestId('increase-from-value'))
      })

      jest.runAllTimers()

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: { from: 20, till: 90 }
      })

      await act(async () => {
        fireEvent.click(screen.getByTestId('decrease-till-value'))
      })

      jest.runAllTimers()

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: { from: 20, till: 80 }
      })
    })

    it('allows passing custom "from" and "till" attribute names', async () => {
      const onFilterChange = jest.fn()

      arrangeTest(
        { slider: { min: 10, max: 90 } },
        onFilterChange,
        TEST_CONFIG_WITH_CUSTOM_PROP_NAMES
      )

      await act(async () => {
        fireEvent.click(screen.getByTestId('toggle-filters-form'))
      })

      await act(async () => {
        fireEvent.click(screen.getByTestId('increase-from-value'))
      })

      jest.runAllTimers()

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: { min: 20, max: 90 }
      })

      await act(async () => {
        fireEvent.click(screen.getByTestId('decrease-till-value'))
      })

      jest.runAllTimers()

      expect(onFilterChange).toHaveBeenCalledWith({
        slider: { min: 20, max: 80 }
      })
    })
  })
})
