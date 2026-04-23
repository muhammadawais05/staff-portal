---
to: src/hosts/main/utils/get-app-routes/__tests__/development.test.ts
inject: true
after: getAppRoutes - development[\s\S]*?getAppRoutes\(\)
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
      RoutePath.<%= Name %>,