---
to: src/hosts/main/components/Routes/config.tsx
inject: true
after: RoutesMapping
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
  [RoutePath.<%= Name %>]: <<%= Name %>/>,