# Kurama

<img src="kurama.jpg" width="320" height="200" />

Kurama - is a Staff Portal CLI for npm scripts

## Why is it needed?

- encapsulates the implementation details of every command
- makes commands in packages shorter
- if we want to change something in any command, we can do it just in one
  place - in CLI. Changes are propagated to all packages that use the CLI

## How does it work?

Thanks to the `bin` property of the `package.json` file in the CLI, it is
possible to run it in npm scripts like `"test": "kurama test"` without
installing it as a dependency. We have it installed in the root `package.json`.

Under the hood, it just maps the first argument (`test` from the case above) to
the appropriate command: `davinci qa unit`.

Also, it passes to the mapped command `options` that can be provided after the
first argument. For instance, `kurama typecheck --listFilesOnly` equals to the
`tsc --listFilesOnly`

### typecheck

It is just an alias for the `tsc` checker. So:

`"typecheck": "kurama typecheck"`

equals to the

`"typecheck": "tsc"`

### lint

Solves the problem with the relative path to the `_scripts/run-package-lint.mjs`
script. Depending on the level of nesting of the package, the `lint` command can
be:

- `"lint": "../../_scripts/run-package-lint.mjs"`
- `"lint": "../../../../_scripts/run-package-lint.mjs"`

With `"lint": "kurama lint"` we don't have this problem anymore, because the
path is resolved inside the `lint.js` script relatively to the package that
executes it

### test

- it encapsulates `davinci qa unit` commands inside.

- it uses root jest config by default `config/jest.specs.js` and pass it to
  davinci as `--config config/jest.specs.js`. If you want to pass your own jest
  config you can do it like `kurama test --config path-to-jest-config.js`

### pact

- it encapsulates `davinci qa unit` commands inside.

- it uses root pact config by default `config/jest.pact.js` and pass it to
  davinci as `--config config/jest.pact.js`. If you want to pass your own pact
  config you can do it like `kurama pact --config path-to-pact-config.js`

### generate-types

- it is a proxy command for the `graphql-codegen`

- simplifies the process of passing the `--watch \"src/**/data/*.gql.ts\"`
  params.

  If you want to use default watch pattern it is enough just to pass empty
  `--watch` flag. It will be converted to the `--watch \"src/**/data/*.gql.ts\"`
  automatically.

  If you want to pass your own pattern to the `--watch` you can provide it after
  equal sign
  `kurama generate-types --watch=\"some-folder/**/gql-folder-name/*.gql.ts\"`.

  Please note that space separation will not work in this case, it is important
  to use `=` for the `--watch`.

  Wrong:

  `kurama generate-types --watch \"some-folder/**/gql-folder-name/*.gql.ts\"`.

  Correct:

  `kurama generate-types --watch=\"some-folder/**/gql-folder-name/*.gql.ts\"`.

  Other flags and params for `generate-types` command don't have this special
  behavior. So you can use space separation for them e.g.
  `kurama generate-types --watch=\"some-folder/**/gql-folder-name/*.gql.ts\" --anotherConfig some-folder/path-to-another-config.js`.
