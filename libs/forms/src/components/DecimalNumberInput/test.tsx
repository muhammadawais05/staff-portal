import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import DecimalNumberInput from './DecimalNumberInput'

const arrangeTest = () => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <DecimalNumberInput name='decimal' label='Decimal Number' />
      </Form>
    </TestWrapper>
  )
}

describe('DecimalNumberInput', () => {
  it('works with only dot value', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '.' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('0.00')
  })

  it('works with integer number', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '8' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('8.00')
  })

  it('works with integer number that ends with dot', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '8.' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('8.00')
  })

  it('works with digits only', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '.88' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('0.88')
  })

  it('truncate or complete digits part', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '0.8888' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('0.88')

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '0.8' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('0.80')
  })

  it('works with empty string', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: '' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('')
  })

  it('ignores value that is not a number', () => {
    arrangeTest()

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: 'abc' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('')

    fireEvent.change(screen.getByLabelText(/Decimal Number/i), {
      target: { value: 'abc123' }
    })

    fireEvent.blur(screen.getByLabelText(/Decimal Number/i))

    expect(screen.getByLabelText(/Decimal Number/i)).toHaveValue('')
  })
})
