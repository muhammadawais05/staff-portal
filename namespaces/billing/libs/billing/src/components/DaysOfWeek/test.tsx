import React, { ComponentProps, ReactNode } from 'react'

import DaysOfWeek from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof DaysOfWeek>
) => renderComponent(<DaysOfWeek {...props}>{children}</DaysOfWeek>)

describe('DaysOfWeek', () => {
  it('default render', () => {
    const { container } = render(null, { weekStartsOn: 1 })

    expect(container).toMatchSnapshot()
  })
})
