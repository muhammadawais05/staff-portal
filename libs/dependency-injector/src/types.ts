/* eslint-disable @typescript-eslint/no-explicit-any */

export type DependencyDefinition<DependencyType = any> = {
  metaData?: any
  dependencyId: number
  __dependencyType?: DependencyType
}

export type TypeOf<D> = D extends DependencyDefinition<infer DependencyType>
  ? DependencyType
  : never

export type DependenciesRegistryMap = Map<
  DependencyDefinition,
  TypeOf<DependencyDefinition>
>

export type GetDependencyFn = <D extends DependencyDefinition>(
  definition: D
) => TypeOf<D> | undefined

export type SetDependencyFn = <D extends DependencyDefinition>(
  definition: D,
  dependency: TypeOf<D>
) => DependenciesRegistry

export type DependenciesRegistry = {
  get: GetDependencyFn
  set: SetDependencyFn
  keys: () => DependencyDefinition[]
  delete: (definition: DependencyDefinition) => void
}
