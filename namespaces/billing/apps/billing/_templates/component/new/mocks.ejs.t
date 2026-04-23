---
to: src/modules/<%= h.changeCase.camelCase(module) %>/components/<%= h.changeCase.pascalCase(name) %>/__mocks__/index.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'

const MockComponent = jest
  .fn()
  .mockImplementation((props) => (
    <div data-testid='<%= Name %>'>{JSON.stringify(props)}</div>
  ))

export default MockComponent
