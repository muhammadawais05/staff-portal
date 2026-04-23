import React, { ReactElement } from 'react'
import { render, screen } from '@testing-library/react'

import EditableWrapper from '.'

jest.mock('@toptal/picasso', () => ({
  Button: (props: Record<string, unknown>) => (
    <div data-testid={props['data-testid'] || 'Button'} />
  ),
  Container: (props: Record<string, unknown> & { children: ReactElement }) => (
    <div data-testid={props['data-testid'] || 'Container'}>
      {props.children}
    </div>
  )
}))
jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    SubmitButton: (props: Record<string, unknown>) => (
      <div data-testid={props['data-testid'] || 'SubmitButton'} />
    )
  }
}))

describe('EditableWrapper', () => {
  it('returns editable wrapper children and buttons', () => {
    const testId = 'EditableWrapperTest'

    render(<EditableWrapper data-testid={testId}>{'children'}</EditableWrapper>)

    expect(screen.getByTestId(testId)).toBeInTheDocument()
    expect(screen.getByTestId(`${testId}-cancel`)).toBeInTheDocument()
    expect(screen.getByTestId(`${testId}-submit`)).toBeInTheDocument()
    expect(screen.getByTestId(testId)).toHaveTextContent('children')
  })
})
