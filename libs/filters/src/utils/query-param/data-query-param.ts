import {
  DocumentNode,
  ApolloClient,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { asQueryParam } from '@staff-portal/query-params-state'

import { HiddenFilterValueObject } from '../../components'

interface DataQueryOptions {
  query: DocumentNode
  entityType: string
  onDataReceived: (
    data: object | undefined,
    id: string
  ) => HiddenFilterValueObject
}

export const dataQueryParam = (
  options: DataQueryOptions,
  client: ApolloClient<object>
) =>
  asQueryParam<HiddenFilterValueObject, string>({
    encode: filter => filter.value,
    decode: async (id: string) => {
      const { query, entityType, onDataReceived } = options
      const { data } = await client.query({
        query,
        variables: {
          id: encodeEntityId(id, entityType)
        }
      })

      return onDataReceived(data, id)
    }
  })
