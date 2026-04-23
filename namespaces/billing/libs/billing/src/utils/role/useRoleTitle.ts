import { parseNodeTypesAsString } from '@staff-portal/ui'
import { Maybe } from '@staff-portal/graphql/staff'

import { QueryAutocompleteNodeFragment } from '../../data'
import { QueryAutocompleteNode_Client_Fragment } from '../../data/queryAutocompleteOptions.graphql.types'

/**
 * TODO : remove useRoleTitle method,
 *   `AutocompleteHighlightOptionSubLabel` should support this
 *   https://toptal-core.atlassian.net/browse/SP-1218
 * @deprecated
 */
export const useRoleTitle = (
  node: Maybe<Omit<QueryAutocompleteNodeFragment, '__typename'>> | undefined,
  nodeTypes: string[]
) => {
  if (!node) {
    return undefined
  }

  const result = parseNodeTypesAsString(nodeTypes)

  if (!nodeTypes.length) {
    return undefined
  }

  return nodeTypes.some(it => it.includes('company'))
    ? result +
        ` #${(node as QueryAutocompleteNode_Client_Fragment).companyLegacyId}`
    : result
}
