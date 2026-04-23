import { parse as parseGql } from 'graphql'
import { useMemo } from 'react'
import { ApolloError, useLazyQuery } from '@staff-portal/data-layer-service'

import { GetLazyLinkQuery, GetLazyLinkVariables, LinkType } from '../../types'

const makeGetLazyLinkQuery = ({ nodeType, propertyName }: LinkType) =>
  parseGql(`
    query GetLazyLink($nodeId: ID!) {
      node(id: $nodeId) {
        ... on ${nodeType} {
          id
          ${propertyName} {
            enabled
            messages
            url
          }
        }
      }
    }
  `)

export const useGetLazyLink = (
  { nodeId, nodeType, propertyName }: GetLazyLinkVariables,
  {
    onCompleted,
    onError
  }: {
    onCompleted: (data: GetLazyLinkQuery) => void
    onError: (error?: ApolloError) => void
  }
) => {
  const getLazyLinkQuery = useMemo(
    () => makeGetLazyLinkQuery({ nodeType, propertyName }),
    [nodeType, propertyName]
  )

  return useLazyQuery<GetLazyLinkQuery, { nodeId: string }>(getLazyLinkQuery, {
    variables: { nodeId },
    fetchPolicy: 'network-only',
    onCompleted,
    onError
  })
}
