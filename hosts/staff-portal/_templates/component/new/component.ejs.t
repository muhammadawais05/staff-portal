---
to: src/modules/<%= module %>/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { FC } from 'react'
import { Container } from '@toptal/picasso'

type Props = {
}

const <%= Name %>: FC<Props> = ({}) => {
  return (
    <Container flex data-testid='<%= h.changeCase.paramCase(name) %>'>
      Example
    </Container>
  )
}

export default <%= Name %>
