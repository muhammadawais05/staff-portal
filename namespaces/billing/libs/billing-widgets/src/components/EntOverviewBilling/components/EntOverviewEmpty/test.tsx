import React, { ComponentProps, ReactNode } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EntOverviewEmpty from '.'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof EntOverviewEmpty>
) => renderComponent(<EntOverviewEmpty {...props}>{children}</EntOverviewEmpty>)

describe('EntOverviewEmpty', () => {
  it('default render', () => {
    const { container } = render(null, {})

    expect(container).toMatchSnapshot()
  })
})
