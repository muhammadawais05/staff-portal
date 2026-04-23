# Dependency Collector

This tool parse all your `import` and `export` statements, gather external paths
and add them to the `dependencies` of new `package-temp.json`.

## How to use?

1. Execute in root of the project:

   ```terminal
   node monorepo-helpers/dependency-collector/index.js TARGET_FOLDER
   ```

   for example

   ```terminal
   node monorepo-helpers/dependency-collector/index.js libs/app-shell
   ```

2. `package-temp.json` (not to conflict with a possible existing file) will be
   created in `TARGET_FOLDER`.
3. Rename it to `package.json`.
4. Fill description, add/remove scripts if necessary.
5. Check `dependencies` and `devDependencies`. Think maybe something needs to be
   changed.
6. Check correctness of dependencies version and ordering in `package.json`.
   - run `yarn syncpack format` to check and order
   - run `yarn syncpack list-mismatches` to check versions mismatch

## Known limitations

- it can't identify dependencies like `@types/jest-when`, you have to add them
  manually
