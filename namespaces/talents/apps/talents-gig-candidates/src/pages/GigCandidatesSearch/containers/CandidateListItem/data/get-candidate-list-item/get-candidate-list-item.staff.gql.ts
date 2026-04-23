import {
  ABORT_KEY,
  BATCH_KEY,
  gql,
  useGetNode
} from '@staff-portal/data-layer-service'
import { TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT } from '@staff-portal/talents'
import { TALENTS_LIST_ITEM_FRAGMENT } from '@staff-portal/talents-list'

import {
  GetCandidateListItemDocument,
  GetCandidateListItemQuery,
  GetCandidateListItemQueryVariables
} from './get-candidate-list-item.staff.gql.types'

const CANDIDATE_LIST_ITEM_FIRST_ABORT_KEY =
  'CANDIDATE_LIST_ITEM_FIRST_ABORT_KEY'
const CANDIDATE_LIST_ITEM_NEXT_BATCH_KEY = 'CANDIDATE_LIST_ITEM_NEXT_BATCH_KEY'

const getQueryContext = (talentIndex: number) => {
  // We don't need any batching so `ABORT_KEY` is used to disable default behaviour
  if (talentIndex === 0) {
    return { [ABORT_KEY]: CANDIDATE_LIST_ITEM_FIRST_ABORT_KEY }
  }

  // Next 2 items are batched separately for scrolling
  if (talentIndex <= 2) {
    return { [BATCH_KEY]: CANDIDATE_LIST_ITEM_NEXT_BATCH_KEY }
  }

  // Next items are batched as per default
  return undefined
}

export const GET_CANDIDATE_LIST_ITEM = gql`
  query GetCandidateListItem($talentId: ID!, $requestId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentsListItemFragment
        blogPosts(
          order: { direction: DESC, field: CREATED_AT }
          pagination: { offset: 0, limit: 1 }
        ) {
          nodes {
            createdAt
            excerpt
            imageUrl
            kind
            locale
            publishedAt
            title
            url
            vertical {
              active
              id
              slug
              title
              url
            }
          }
        }
        operations {
          subscribeToTalentAvailabilityUpdates {
            messages
            callable
          }
          createP2PReachOut(requestId: $requestId) {
            callable
            messages
          }
        }

        viewerActiveAvailabilitySubscription {
          ...TalentAvailabilitySubscriptionFragment
        }
      }
    }
  }

  ${TALENTS_LIST_ITEM_FRAGMENT}
  ${TALENT_AVAILABILITY_SUBSCRIPTION_FRAGMENT}
`

export const useGetCandidateListItem = (
  talentId: string,
  talentIndex: number,
  requestId: string
) => {
  const talentResult = useGetNode<
    { node?: GetCandidateListItemQuery['node'] },
    GetCandidateListItemQueryVariables
  >(GetCandidateListItemDocument)(
    { talentId, requestId },
    {
      context: getQueryContext(talentIndex)
    }
  )

  return talentResult
}
