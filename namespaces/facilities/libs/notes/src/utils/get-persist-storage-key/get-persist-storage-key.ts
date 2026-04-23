import { decodeEntityId } from '@staff-portal/data-layer-service'

export const getPersistStorageKey = (nodeId: string) => {
  const { id, type } = decodeEntityId(nodeId)

  return `new_activity_for_${type.toLocaleLowerCase()}_${id}`
}
