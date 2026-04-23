// Copied from https://github.com/toptal/staff-portal/blob/master/libs/filters/src/utils/query-param/gql-id-query-param.ts#L1
// TODO: Should we migrate this to SP?
import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

enum ME_NONE_SET {
  me = 'ME',
  none = 'NONE',
  ME = 'me',
  NONE = 'none'
}

const isMeOrNone = (id = '') => Object.keys(ME_NONE_SET).includes(id)

export const GqlNoneMeIdQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam<string, string>({
    // we use encode below. should it be decode?
    decode: id =>
      isMeOrNone(id)
        ? ME_NONE_SET[id as ME_NONE_SET]
        : encodeEntityId(id, prefixEntityType, prefixVersion),
    encode: gid =>
      isMeOrNone(gid)
        ? ME_NONE_SET[gid as ME_NONE_SET]
        : gid
        ? decodeEntityId(gid).id
        : ''
  })
