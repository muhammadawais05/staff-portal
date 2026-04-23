import { ApolloClient } from '@apollo/client'
import { AutocompleteModels } from '@staff-portal/graphql/staff'

import { encodeId, NodeIdPrefix } from '../../_lib/helpers/apollo'
import {
  QueryAutocompleteDocument,
  QueryAutocompleteQuery,
  QueryAutocompleteClientFragment
} from '../../data'

type Client = ApolloClient<object>

const MAX_RESTORE_RESULTS = 100

export const getBadgeOptionsByQueryParams =
  (model: AutocompleteModels, type: keyof typeof NodeIdPrefix) =>
  async (ids: string[], client: Client) => {
    // @see ER-9351
    // sometimes `ids` could be not an array no matter that it's hardly specified as array type
    // there is a check on staff-portal side from now, but we need to handle this case on our side, just
    // so it won't break in the future.
    const idsArray: string[] = Array.isArray(ids) ? ids : []
    const { data, loading } = await client.query({
      query: QueryAutocompleteDocument,
      variables: {
        term: '',
        ids: idsArray.map(id => encodeId({ id, type })),
        model,
        offset: 0,
        limit: Math.min(MAX_RESTORE_RESULTS, idsArray.length)
      }
    })

    const nodes = ((data as QueryAutocompleteQuery)?.autocomplete?.edges || [])
      .map(({ node, label }) => {
        const companyLegacyId = (node as QueryAutocompleteClientFragment)
          .companyLegacyId

        if (!node) {
          return null
        }

        return {
          // TODO: remove `companyLegacyId`
          //   `Client` entities should use Company id instead of Client id
          //    @see https://toptal-core.atlassian.net/browse/SPB-1290
          //   Actually, `companyLegacyId` is deprecated, but invoices\payments filtration
          //   doesn't work properly in case of client id usage and we still need to use company id instead
          companyLegacyId,
          id: node.id,
          label: label || ''
        }
      })
      .filter((node): node is NonNullable<typeof node> => Boolean(node))

    return {
      data: nodes,
      loading
    }
  }

export default getBadgeOptionsByQueryParams
