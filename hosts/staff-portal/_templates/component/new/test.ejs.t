---
to: src/modules/<%= module %>/components/<%= h.changeCase.pascalCase(name) %>/test.tsx
---
import React from 'react'
import { render, screen } from '@testing-library/react'

import { TestWrapper } from '@staff-portal/test-utils'
import <%= Name %> from '../../components/<%= Name %>/<%= Name %>'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <<%= name %> />
    </TestWrapper>
  )

describe('<%= name %>', () => {
  it('renders', () => {
    arrangeTest()
    const <%= h.changeCase.camelCase(name) %> = screen.getByTestId('<%= h.changeCase.paramCase(name) %>')

    expect(<%= h.changeCase.camelCase(name) %>).toBeInTheDocument()
  })
})
