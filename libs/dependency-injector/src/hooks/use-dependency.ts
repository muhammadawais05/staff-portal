import { useContext } from 'react'

import { DependencyDefinition, TypeOf } from '../types'
import { DependenciesContext } from '../contexts/dependencies-context'

export const useDependency = <D extends DependencyDefinition>(
  definition: D
): TypeOf<D> | undefined => {
  const { registry } = useContext(DependenciesContext)

  return registry.get(definition)
}
