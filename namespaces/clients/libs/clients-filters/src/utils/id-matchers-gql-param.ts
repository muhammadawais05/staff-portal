import { decodeEntityId } from '@staff-portal/data-layer-service'

import { ME_NONE_SET } from '../config'
import { isMeOrNone } from './is-me-or-none'

export const MatcherGqlParam = () => (values: unknown) =>
  Object.entries(values as Record<string, string>)
    .map(([key, value]) => ({
      roleIdentifier: isMeOrNone(value)
        ? ME_NONE_SET[value as ME_NONE_SET]
        : value
        ? decodeEntityId(value).id
        : '',
      talentType: key
    }))
    .filter(val => val.roleIdentifier)
