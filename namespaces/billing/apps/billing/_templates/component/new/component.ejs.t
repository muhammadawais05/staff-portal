---
to: src/modules/<%= h.changeCase.camelCase(module) %>/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { FC, memo } from 'react'

import * as S from './styles'

const displayName = '<%= Name %>'

interface Props {
}

const <%= Name %>: FC<Props> = memo<Props>((props) => {
  return null
})

<%= Name %>.displayName = displayName

export default <%= Name %>
