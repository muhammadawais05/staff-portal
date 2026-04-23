import {
  DependenciesRegistryMap,
  DependenciesRegistry,
  GetDependencyFn
} from '../types'

// wrapper around modals registry with a bit more type safety
export const useDependenciesRegistry = () => {
  // always spawn new registry whenever app is updated
  const registry: DependenciesRegistryMap = new Map()

  const depsRegistry: DependenciesRegistry = {
    set: (definition, dependency) => {
      registry.set(definition, dependency)

      return depsRegistry
    },
    get: (definition => registry.get(definition)) as GetDependencyFn,
    delete: modal => registry.delete(modal),
    keys: () => Array.from(registry.keys())
  }

  return depsRegistry
}
