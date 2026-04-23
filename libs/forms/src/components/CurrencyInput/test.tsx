import { fireEvent, render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import CurrencyInput, { Props } from './CurrencyInput'

const arrangeTest = (props: Pick<Props, 'allowDecimals' | 'precision'>) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <CurrencyInput {...props} name='currency' label='Currency Input' />
      </Form>
    </TestWrapper>
  )
}

describe('CurrencyInput', () => {
  const fieldLabelRegExp = /Currency Input/i

  it('works with only dot value', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '.' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('0.00')
  })

  it('works with integer number', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '8' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('8.00')
  })

  it('works with integer number that ends with dot', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '8.' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('8.00')
  })

  it('works with digits only', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '.88' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('0.00')
  })

  it('truncate or complete digits part', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '0.8888' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('0.00')

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '0.8' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('0.00')
  })

  it('works with empty string', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('')
  })

  it('ignores value that is not a number', () => {
    arrangeTest({ allowDecimals: false })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: 'abc' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('')

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: 'abc123' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('')
  })

  it('allows to set precision', () => {
    arrangeTest({ allowDecimals: false, precision: 0 })

    fireEvent.change(screen.getByLabelText(fieldLabelRegExp), {
      target: { value: '8' }
    })

    fireEvent.blur(screen.getByLabelText(fieldLabelRegExp))

    expect(screen.getByLabelText(fieldLabelRegExp)).toHaveValue('8')
  })
})
