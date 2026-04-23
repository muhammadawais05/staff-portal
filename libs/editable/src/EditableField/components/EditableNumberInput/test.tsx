import React from 'react'
import { render, screen } from '@testing-library/react'

import EditableNumberInput from '.'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    NumberInput: (props: Record<string, string>) => (
      <div data-testid={props['data-testid'] || 'NumberInput'}>
        {JSON.stringify(props)}
      </div>
    )
  }
}))

const arrangeTest = () => render(<EditableNumberInput name='test' />)

describe('EditableNumberInput', () => {
  it('renders form number input', () => {
    arrangeTest()

    const container = screen.getByTestId('EditableNumberInput')

    expect(container).toBeInTheDocument()
    expect(container).toHaveTextContent('autoFocus')
    expect(container).toHaveTextContent('"size":"small"')
    expect(container).toHaveTextContent('"width":"full"')
  })
})
