import {
  encodeEntityId,
  decodeEntityId,
  SchemaVersionPrefix
} from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

export const gqlArrayIdQueryParam = (
  prefixEntityType: string,
  prefixVersion?: SchemaVersionPrefix
) =>
  asQueryParam<string[], string[]>({
    decode: ids =>
      ids.map(id => encodeEntityId(id, prefixEntityType, prefixVersion)),
    encode: gids => gids.map(gid => (gid ? decodeEntityId(gid).id : ''))
  })
