---
to: src/hosts/main/components/Routes/config.tsx
inject: true
before: RoutesMapping
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
const <%= Name %> = lazy(
  () => import('~/modules/<%= moduleName %>/pages/<%= Name %>')
)
