import { createContext } from 'react'

import { DependenciesRegistry } from '../types'

const returnEmptyDependency = () => {
  return undefined
}

const returnEmptyKeys = () => {
  return []
}

const throwWrongContext = () => {
  throw new Error('Dependencies cannot be used outside of DependencyInjector')
}

export const DependenciesContext = createContext<{
  registry: DependenciesRegistry
}>({
  registry: {
    delete: throwWrongContext,
    set: throwWrongContext,
    get: returnEmptyDependency,
    keys: returnEmptyKeys
  }
})
