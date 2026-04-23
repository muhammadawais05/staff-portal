import { encodeEntityId } from '@staff-portal/data-layer-service'

import { HiddenFilterValueObject } from '../../components'

export const HiddenToGqlParam = (entityType: string) => (value: unknown) => {
  const id = (value as HiddenFilterValueObject).value

  return encodeEntityId(id, entityType)
}
