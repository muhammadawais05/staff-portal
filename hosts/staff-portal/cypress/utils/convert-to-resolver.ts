import { ResolversParentTypes } from '@staff-portal/graphql/staff'

const convertToResolver = <
  TEntityResolver = never,
  TEntityName extends keyof ResolversParentTypes = never
>(
  entity: Partial<ResolversParentTypes[TEntityName]>
): TEntityResolver => {
  return Object.entries(entity).reduce<TEntityResolver>((acc, [key, value]) => {
    return {
      ...acc,
      [key]: () => value
    }
  }, {} as TEntityResolver)
}

export default convertToResolver
