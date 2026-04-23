import React, { ComponentProps, ReactNode } from 'react'

import ErrorMessage from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof ErrorMessage>
) => renderComponent(<ErrorMessage {...props}>{children}</ErrorMessage>)

describe('ErrorMessage', () => {
  it('default render', () => {
    const { container } = render(null, {})

    expect(container).toMatchSnapshot()
  })
})
