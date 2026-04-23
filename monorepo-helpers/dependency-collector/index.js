#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import * as glob from 'globby'
import _ from 'lodash'
import { fileURLToPath } from 'url'

// To find a list of all `devDependencies` in all package.json files.
// Based on this list we can choose if the package
// goes to `dependencies` or `devDependencies`
const projectDevDependencies = new Set()

// Object where `key` is the package name and `value` - version.
// Data gathers from all `package.json` files.
// It is used to set a version of the package in new `package.json` file.
const dependenciesListInProject = _.uniq(
  _.flatten(
    glob
      .globbySync(['**/package.json', '!**/node_modules/**/package.json'])
      .map(file => fs.readFileSync(file, 'utf-8').toString())
      .map(content => {
        const devDependencies = JSON.parse(`${content}`).devDependencies
        const dependencies = JSON.parse(`${content}`).dependencies
        const peerDependencies = JSON.parse(`${content}`).peerDependencies

        if (devDependencies) {
          Object.keys(devDependencies).forEach(dep =>
            projectDevDependencies.add(dep)
          )
        }

        const result = {
          ...devDependencies,
          ...dependencies,
          ...peerDependencies
        }

        return Object.keys(result).length ? result : undefined
      })
      .filter(Boolean)
      .sort()
  )
).reduce(
  (acc, cur) => ({
    ...acc,
    ...cur
  }),
  {}
)

const sourcesGlob = path.join(
  process.argv[2] || process.cwd(),
  '**',
  '*.{ts,tsx,js,jsx}'
)

const dirname = path.dirname(fileURLToPath(import.meta.url))
const template = JSON.parse(
  fs.readFileSync(path.join(dirname, 'template.json'), 'utf-8')
)
const patt = /(export|import).+from\s['"]([^"']*).+/g

const packageDependencies = _.uniq(
  _.flatten(
    glob
      .globbySync(sourcesGlob)
      .filter(file => !/node_modules/.test(file))
      .map(file => fs.readFileSync(file, 'utf-8').toString())
      .map(content =>
        content.match(patt)?.map(part => part.replace(patt, '$2'))
      )
      .filter(Boolean)
  )
    .filter(
      dependency => !dependency.startsWith('.') && !dependency.startsWith('~')
    )
    .sort()
    .map(content => {
      if (!content.startsWith('@')) {
        return content.split('/')[0]
      }
      const [namespace, packageName] = content.split('/')

      return `${namespace}/${packageName}`
    })
)

const devDependencies = packageDependencies.filter(dependency =>
  projectDevDependencies.has(dependency)
)
const dependencies = packageDependencies.filter(
  dependency => !projectDevDependencies.has(dependency)
)

const result = {
  ...template,
  name: `@staff-portal/${path.basename(process.argv[2] || process.cwd())}`
}

if (dependencies.length) {
  result.dependencies = dependencies.reduce(
    (acc, dependency) => ({
      ...acc,
      [dependency]: dependenciesListInProject[dependency] || '^0.0.1'
    }),
    {}
  )
}

if (devDependencies.length) {
  result.devDependencies = devDependencies.reduce(
    (acc, dependency) => ({
      ...acc,
      [dependency]: dependenciesListInProject[dependency] || '^0.0.1'
    }),
    {}
  )
}

const packageJson = JSON.stringify(result, null, 2)

const fileName = 'package-temp.json'

fs.writeFileSync(path.join(process.argv[2], fileName), packageJson + '\n')
