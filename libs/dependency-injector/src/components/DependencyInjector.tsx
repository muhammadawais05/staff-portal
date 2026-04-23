import React, { ReactNode } from 'react'

import { DependenciesRegistry } from '../types'
import { DependenciesContext } from '../contexts/dependencies-context'
import { useDependenciesRegistry } from '../hooks/use-dependencies-registry'

interface Props {
  registry?: DependenciesRegistry
  children?: ReactNode
}

export const DependencyInjector = ({ registry, children }: Props) => {
  // use empty registry if no dependencies were passed from outside
  const defaultRegistry = useDependenciesRegistry()

  return (
    <DependenciesContext.Provider
      value={{ registry: registry ?? defaultRegistry }}
    >
      {children}
    </DependenciesContext.Provider>
  )
}
