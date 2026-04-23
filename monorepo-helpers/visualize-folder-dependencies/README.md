# Visualize Folder Dependencies

This tool is useful when you want to see the dependencies of the **folder**. It
checks dependencies **recursively** in **nested** folders too. According to the
generated list of dependencies, you can, for example, understand what
dependencies you will bring to another package if you move this folder there.

It saves you from the situation where you've already started extraction and then
realize that your folder uses something you didn't expect. The script can take
20-30s or more.

## How to use?

1. Imagine you want to extract
   `namespaces/clients/apps/clients/src/components/Investigations` to a package.
2. From the root run command

   ```terminal
   ./node_modules/.bin/depcruise --config monorepo-helpers/visualize-folder-dependencies/.dependency-cruiser.js --focus '^namespaces/clients/apps/clients/src/components/Investigations' --collapse 8 --output-type ddot namespaces/clients/apps/clients/src/components/Investigations | dot -T svg > monorepo-helpers/visualize-folder-dependencies/dependencygraph.svg
   ```

3. It will create [dependencygraph.svg](./dependencygraph.svg) file in
   `monorepo-helpers/visualize-folder-dependencies`. Open it with browser.
4. What does this image tell us? It shows that
   `namespaces/clients/apps/clients/src/components/Investigations` depends on
   some libs and `namespaces/clients/apps/clients/src/utils`. It is not ready to
   be extracted to a package. We should first remove
   `namespaces/clients/apps/clients/src/utils` dependencies and only after that
   we can start extraction of the folder to a package.

## How does it work?

- it uses [dependency-cruiser](https://github.com/sverweij/dependency-cruiser)

- `./node_modules/.bin/depcruise` - path to the package. you can use just
  `depcruise` if you have installed it globally

- `--config monorepo-helpers/visualize-folder-dependencies/.dependency-cruiser.js` -
  path to the config. It doesn't do anything important now. You can just extend
  it with more options if you want.

- `--focus '^namespaces/clients/apps/clients/src/components/Investigations'` -
  to inspect a folder and see what the direct dependencies are and which folders
  are direct dependents,
  [more info](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--focus-show-modules-and-their-direct-neighbours)

- `--collapse 8` - you can add this when you work with big folders. You can use
  any number, not only `8`. This will not allow drawing in detail the insides of
  the folder you are working with,
  [more info](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--collapse-summarize-to-folder-depth-or-pattern)

- `--output-type ddot` - specify the output format. A more detailed format is
  `dot`, where you can limit the detailing with `--max-depth`,
  [more info](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--output-type-specify-the-output-format)

- `namespaces/clients/apps/clients/src/components/Investigations` - path to the
  folder to search dependencies for

- `| dot -T svg > monorepo-helpers/visualize-folder-dependencies/dependencygraph.svg` -
  use GraphViz to visualize and produce `dependencygraph.svg` file in
  `monorepo-helpers/visualize-folder-dependencies`

- `--include-only` - only take modules into account that are you pass a param.
  For instance: `--include-only '^namespaces/clients/apps/clients/src'`. This is
  useful when you are not interested in external dependencies like `libs/*`,
  [more info](https://github.com/sverweij/dependency-cruiser/blob/develop/doc/cli.md#--include-only-only-include-modules-satisfying-a-pattern)

- `.dependency-cruiser.js`:
  - `exclude` - to filter `node_modules` dependencies

## FAQ

### What if I have aliases specified in `webpack.config.js`, how it will resolve them? In this case, you need to add

```js
webpackConfig: {
  fileName: 'monorepo-helpers/visualize-folder-dependencies/webpack.config.js'
}
```

to `.dependency-cruiser.js` and create a file `webpack.config.js` with something
like this:

```js
const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '~': path.resolve(__dirname, '../../hosts/staff-portal/src/')
    }
  }
}
```
