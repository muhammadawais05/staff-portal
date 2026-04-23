import { asQueryParam } from '@staff-portal/query-params-state'
import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'

import { isMeOrNone } from './is-me-or-none'
import { ME_NONE_SET } from '../config'

export const gqlIdMatchersQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam({
    decode: (object: Record<string, string>) => {
      const values = Object.entries(object).map(([key, id]) => [
        key,
        isMeOrNone(id)
          ? ME_NONE_SET[id as ME_NONE_SET]
          : encodeEntityId(id, prefixEntityType, prefixVersion)
      ])

      return Object.fromEntries(values)
    },
    encode: (object: Record<string, string>) => {
      const values = Object.entries(object).map(([key, gid]) =>
        gid
          ? [
              key,
              isMeOrNone(gid)
                ? ME_NONE_SET[gid as ME_NONE_SET]
                : gid
                ? decodeEntityId(gid).id
                : ''
            ]
          : []
      )

      return Object.fromEntries(values)
    }
  })
