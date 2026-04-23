import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

import { parseNumericString } from '../parse-and-format-url-params'

export const gqlIdQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam<string, string>({
    sanitize: id => parseNumericString(id),
    decode: id => encodeEntityId(id, prefixEntityType, prefixVersion),
    encode: gid => (gid ? decodeEntityId(gid).id : '')
  })
