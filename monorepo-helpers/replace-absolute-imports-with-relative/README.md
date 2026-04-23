# Replace absolute imports with relative

This tool gets all files in the specified folder and replaces all absolute
imports with provided alias with relative imports inside that folder.

## How to use?

1. Execute in root of the project:

   ```terminal
   node monorepo-helpers/replace-absolute-imports-with-relative/index.js PATH_TO_FOLDER IMPORT_ALIAS_THAT_YOUR_WANT_TO_REPLACE
   ```

   for instance

   ```terminal
   node monorepo-helpers/replace-absolute-imports-with-relative/index.js namespaces/engagements/apps/engagements/src @staff-portal/engagements-app/src
   ```

2. Do a search in your IDE to check leftovers for
   `@staff-portal/engagements-app`  
   (`IMPORT_ALIAS_THAT_YOUR_WANT_TO_REPLACE`), because the case like below is
   not handled by the script:

   ```ts
   import { MyComponent } from '@staff-portal/engagements-app'
   ```

   They are not handled because it is better to specify more specific relative
   path manually in such cases
