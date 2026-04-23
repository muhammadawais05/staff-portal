---
to: src/libs/routes/enums/route-path.ts
inject: true
after: RoutePath
---
<%
  Name = h.changeCase.pascalCase(name)
  Path = h.changeCase.snakeCase(name)
-%>
  <%= Name %> = '/<%= Path %>',