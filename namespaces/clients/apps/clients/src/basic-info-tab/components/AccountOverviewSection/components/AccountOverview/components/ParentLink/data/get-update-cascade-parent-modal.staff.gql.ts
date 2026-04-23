import { gql, useQuery } from '@staff-portal/data-layer-service'

import { GetUpdateCascadeParentInfoDocument } from './get-update-cascade-parent-modal.staff.gql.types'

export default gql`
  query GetUpdateCascadeParentInfo($clientId: ID!, $parentId: ID!) {
    parent: node(id: $parentId) {
      ... on Client {
        id
        webResource {
          text
          url
        }
      }
    }
    client: node(id: $clientId) {
      ... on Client {
        id
        cascadeParentUpdateInfo(parentId: $parentId) {
          parentAttributeOptions {
            attribute
            checked
            disabled
            hintOrError
          }
          parentStaContracts {
            edges {
              checked
              disabled
              node {
                id
                title
              }
            }
            hasClickableContracts
            hasDeprecatedContracts
          }
        }
      }
    }
  }
`

export const useGetUpdateCascadeParentInfo = ({
  clientId,
  parentId
}: {
  clientId: string
  parentId: string
}) => {
  const { data, loading, initialLoading } = useQuery(
    GetUpdateCascadeParentInfoDocument,
    {
      variables: {
        clientId,
        parentId
      }
    }
  )
  const { parent, client } = data || {}
  const { webResource } = parent || {}
  const { cascadeParentUpdateInfo } = client || {}
  const { parentAttributeOptions, parentStaContracts } =
    cascadeParentUpdateInfo || {}
  const {
    edges: staContracts,
    hasClickableContracts,
    hasDeprecatedContracts
  } = parentStaContracts || {}
  const hasAnySTAContracts = !!staContracts?.length

  return {
    webResource,
    parentAttributeOptions,
    staContracts,
    hasClickableContracts,
    hasDeprecatedContracts,
    hasAnySTAContracts,
    loading,
    initialLoading
  }
}
