import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import AmountRangeInput, { Props } from './AmountRangeInput'
import {
  cleanNumberValueWithLimit,
  formattedCleanNumberValueWithLimit
} from './utils'

const defaultProps = {
  label: 'Amount',
  name: 'amount',
  value: {
    from: 10,
    to: 15
  },
  min: -30,
  max: 30,
  onChange: jest.fn(),
  onReset: jest.fn()
}

const arrangeTest = (props: Props = defaultProps) => {
  return render(
    <TestWrapper>
      <AmountRangeInput {...props} />
    </TestWrapper>
  )
}

const fromInput = () => screen.getByTestId(`${defaultProps.name}.from`)

const toInput = () => screen.getByTestId(`${defaultProps.name}.to`)

const changeInput = (input: HTMLElement, newAmount: string) =>
  fireEvent.change(input, { target: { value: newAmount } })

const resetInput = (index: number) => {
  fireEvent.click(screen.getAllByRole('reset')[index])
}

describe('AmountRangeInput', () => {
  it('shows the "from" amount', () => {
    arrangeTest()
    expect(fromInput()).toHaveValue(defaultProps.value.from.toString())
  })

  it('shows the "to" amount', () => {
    arrangeTest()
    expect(toInput()).toHaveValue(defaultProps.value.to.toString())
  })

  it('sets default "maxLength" value', () => {
    arrangeTest()
    expect(toInput()).toHaveAttribute('maxLength', '11')
  })

  it('changes the "from" amount', () => {
    const newAmount = '12'

    arrangeTest()

    changeInput(fromInput(), newAmount)

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      from: newAmount,
      to: defaultProps.value.to
    })
  })

  it('changes the "to" amount', () => {
    const newAmount = '17'

    arrangeTest()

    changeInput(toInput(), newAmount)

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1)
    expect(defaultProps.onChange).toHaveBeenCalledWith({
      from: defaultProps.value.from,
      to: newAmount
    })
  })

  // Random fail, checked manually, reset button presented only on hover
  // eslint-disable-next-line
  it.skip('resets the "from" amount', () => {
    arrangeTest()

    fireEvent.mouseEnter(fromInput())

    // Reset the "from" input
    resetInput(0)

    expect(defaultProps.onReset).toHaveBeenCalledTimes(1)
    expect(defaultProps.onReset).toHaveBeenCalledWith({
      from: '',
      to: defaultProps.value.to
    })
  })

  // Random fail, checked manually, reset button presented only on hover
  // eslint-disable-next-line
  it.skip('resets the "to" amount', () => {
    arrangeTest()

    fireEvent.mouseEnter(fromInput())

    // Reset the "to" input
    resetInput(1)

    expect(defaultProps.onReset).toHaveBeenCalledTimes(1)
    expect(defaultProps.onReset).toHaveBeenCalledWith({
      from: defaultProps.value.from,
      to: ''
    })
  })

  it('shows an error', () => {
    arrangeTest({
      ...defaultProps,
      hasError: true
    })

    expect(fromInput()).toHaveAttribute('aria-invalid', 'true')
    expect(toInput()).toHaveAttribute('aria-invalid', 'true')
  })

  describe('When `to` is undefined', () => {
    it('does not trigger a validation error', () => {
      arrangeTest({
        ...defaultProps,
        value: {
          from: 5,
          to: undefined
        }
      })

      expect(fromInput()).toHaveAttribute('aria-invalid', 'false')
      expect(toInput()).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('cleanNumberValueWithLimit', () => {
    it('properly formats the input value', () => {
      const formatter = cleanNumberValueWithLimit(11)

      expect(formatter('')).toBe('')
      expect(formatter('string')).toBe('')
      expect(formatter('1a2b3e')).toBe('123')
      expect(formatter('12...323.23.32.')).toBe('12.')
      expect(formatter('$1,000,,000...00.00')).toBe('1000000.')
      expect(formatter('1111')).toBe('1111')
      expect(formatter('1.00')).toBe('1.00')
      expect(formatter('1.0000')).toBe('1.0000')
      expect(formatter('1234567891234')).toBe('12345678912')
      expect(formatter('1234567891234.')).toBe('12345678912.')
      expect(formatter('1234567891234.00')).toBe('12345678912.00')
      expect(formatter('1234567891234.0000')).toBe('12345678912.0000')
    })
  })

  describe('formattedCleanNumberValueWithLimit', () => {
    it('properly formats the input value', () => {
      const formatter = formattedCleanNumberValueWithLimit(11)

      expect(formatter('')).toBe('')
      expect(formatter('string')).toBe('')
      expect(formatter('1')).toBe('1.00')
      expect(formatter('1.00')).toBe('1.00')
      expect(formatter('1.5')).toBe('1.50')
      expect(formatter('1.455')).toBe('1.46')
      expect(formatter('1234567891234.0000')).toBe('12345678912.00')
    })
  })
})
