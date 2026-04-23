---
to: src/libs/routes/config.ts
inject: true
after: ROUTES
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
  {
    ...DEVELOPMENT_STEP,
    path: RoutePath.<%= Name %>
  },