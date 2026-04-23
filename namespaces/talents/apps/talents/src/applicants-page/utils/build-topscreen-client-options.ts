import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { TopscreenClientFragment } from '../data/get-topscreen-clients'

export const buildTopscreenClientOptions = (
  topscreenClients?: TopscreenClientFragment[]
) => {
  if (!topscreenClients) {
    return []
  }

  const options = topscreenClients
    .filter(Boolean)
    .map(({ id, name }: TopscreenClientFragment) => ({
      value: decodeEntityId(id).id,
      label: name ?? ''
    }))

  return [NOT_SELECTED_OPTION, ...options]
}
