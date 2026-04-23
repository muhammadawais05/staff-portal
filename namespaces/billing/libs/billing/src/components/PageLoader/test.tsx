import React, { ComponentProps, ReactNode } from 'react'

import PageLoader from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof PageLoader>
) => renderComponent(<PageLoader {...props}>{children}</PageLoader>)

describe('PageLoader', () => {
  it('default render', () => {
    const { container } = render(null, {})

    expect(container).toMatchSnapshot()
  })
})
