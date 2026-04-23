---
to: src/_lib/context/<%= h.changeCase.camelCase(name) %>/index.ts
---
<%
  Name = h.changeCase.camelCase(name)
-%>
import { createContext, useContext } from 'react'

interface <%= h.changeCase.camelCase(name) %>Props {

}

const initialData = {}

export const <%= h.changeCase.pascalCase(name) %> = createContext<<%= h.changeCase.camelCase(name) %>Props>(initialData)

export const use<%= h.changeCase.pascalCase(name) %> = (): <%= h.changeCase.camelCase(name) %>Props =>
  useContext(<%= h.changeCase.pascalCase(name) %>)
