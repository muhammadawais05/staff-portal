import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

enum ME_NONE_SET {
  me = 'me',
  none = 'none'
}

const isMeOrNone = (id = '') =>
  Object.keys(ME_NONE_SET).some(key => key.toLowerCase() === id.toLowerCase())

export const gqlNoneMeIdQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam<string, string>({
    decode: id =>
      isMeOrNone(id)
        ? ME_NONE_SET[id.toLowerCase() as ME_NONE_SET]
        : encodeEntityId(id, prefixEntityType, prefixVersion),
    encode: gid =>
      isMeOrNone(gid)
        ? ME_NONE_SET[gid.toLowerCase() as ME_NONE_SET]
        : gid
        ? decodeEntityId(gid).id
        : ''
  })
