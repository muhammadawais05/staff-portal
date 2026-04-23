import { asQueryParam } from '@staff-portal/query-params-state'
import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'

import { isMeOrNone } from './is-me-or-none'
import { ME_NONE_SET } from '../config'

export const gqlIdStaffQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam({
    decode: (id: unknown) =>
      isMeOrNone(id as string)
        ? ME_NONE_SET[id as ME_NONE_SET]
        : encodeEntityId(id as string, prefixEntityType, prefixVersion),
    encode: (gid: unknown) =>
      isMeOrNone(gid as string)
        ? ME_NONE_SET[gid as ME_NONE_SET]
        : gid
        ? decodeEntityId(gid as string).id
        : ''
  })
