/* eslint-disable @typescript-eslint/no-explicit-any */

import { DependencyDefinition } from '../types'

let dependencyId = 0

export const defineDependency = <D = undefined>(
  metaData?: any
): DependencyDefinition<D> => ({ metaData, dependencyId: ++dependencyId })
