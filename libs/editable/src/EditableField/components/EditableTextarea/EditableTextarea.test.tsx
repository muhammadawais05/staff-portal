import React from 'react'
import { screen, render } from '@testing-library/react'

import EditableTextarea from '.'

jest.mock('../EditableWrapper')
jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    Input: (props: Record<string, string>) => (
      <div data-testid={props['data-testid'] || 'Input'}>
        {JSON.stringify(props)}
      </div>
    )
  }
}))

describe('EditableTextarea', () => {
  it('renders form multiline input', () => {
    render(<EditableTextarea name='test' placeholder='test' />)

    const input = screen.getByTestId('EditableTextarea-input')

    expect(screen.getByTestId('EditableWrapper')).toBeInTheDocument()

    expect(input).toBeInTheDocument()
    expect(input).toHaveTextContent('"autoFocus":false')
    expect(input).toHaveTextContent('"name":"test"')
    expect(input).toHaveTextContent('"placeholder":"test"')
    expect(input).toHaveTextContent('"multiline":true')
    expect(input).toHaveTextContent('"rowsMin":4')
    expect(input).toHaveTextContent('"rowsMax":10')
    expect(input).toHaveTextContent('"width":"full"')
  })
})
