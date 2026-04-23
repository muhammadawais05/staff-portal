---
to: src/modules/<%= h.changeCase.camelCase(module) %>/components/<%= h.changeCase.pascalCase(name) %>/index.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default } from './<%= Name %>'
