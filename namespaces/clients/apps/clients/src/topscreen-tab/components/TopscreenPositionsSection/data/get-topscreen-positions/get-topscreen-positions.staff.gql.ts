import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import { GetTopscreenPositionsDocument } from './get-topscreen-positions.staff.gql.types'

export default gql`
  query GetTopscreenPositions($clientId: ID!) {
    node(id: $clientId) {
      ...TopscreenClient
    }
    operations {
      createTopscreenTalent {
        ...OperationFragment
      }
    }
  }

  fragment TopscreenClient on TopscreenClient {
    id
    topscreenPositions {
      nodes {
        ...TopscreenPosition
      }
    }
    operations {
      createTopscreenPosition {
        ...OperationFragment
      }
    }
  }

  fragment TopscreenPosition on TopscreenPosition {
    id
    title
    status
    jobUrl
    description
    stepTypes {
      nodes
    }
    operations {
      activateTopscreenPosition {
        ...OperationFragment
      }
      updateTopscreenPosition {
        ...OperationFragment
      }
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetTopscreenPositions = (clientId: string) => {
  const { data, loading, refetch } = useQuery(GetTopscreenPositionsDocument, {
    variables: {
      clientId
    },
    throwOnError: true
  })

  return {
    createTopScreenOperation: data?.node?.operations.createTopscreenPosition,
    createTopscreenTalentOperation: data?.operations.createTopscreenTalent,
    topscreenPositions: data?.node?.topscreenPositions?.nodes,
    loading,
    refetch
  }
}
