import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTopscreenClientGqlValue = (topscreenClientId: unknown) => {
  if (!topscreenClientId) {
    return
  }

  return encodeEntityId(topscreenClientId as string, 'TopscreenClient')
}
