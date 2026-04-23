---
to: src/modules/<%= h.changeCase.camelCase(module) %>/components/<%= h.changeCase.pascalCase(name) %>/test.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { ComponentProps, ReactNode } from 'react'

import <%= Name %> from '.'
import renderComponent from '../modules/core/utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof <%= Name %>>
) => renderComponent(<<%= Name %> {...props}>{children}</<%= Name %>>)

describe('<%= Name %>', () => {
  it('default render', () => {
    const { getByTestId } = render(null, {})

    expect(getByTestId('testid')).toContainHTML('html')
  })
})
