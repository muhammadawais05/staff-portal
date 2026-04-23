import {
  ABORT_KEY,
  BATCH_KEY,
  gql,
  useGetNode
} from '@staff-portal/data-layer-service'
import {
  JOB_CANDIDATE_OPERATIONS_FRAGMENT,
  TALENT_JOB_PREFERENCES_FRAGMENT
} from '@staff-portal/talents'

import { TALENTS_LIST_ITEM_FRAGMENT } from '../../../../data'
import { TalentListItemType } from '../../../../types'
import {
  GetJobTalentListItemDocument,
  GetTalentListItemDocument,
  GetTalentListItemQueryVariables
} from './get-talent-list-item.staff.gql.types'

const TALENT_LIST_ITEM_FIRST_ABORT_KEY = 'TALENT_LIST_ITEM_FIRST_ABORT_KEY'
const TALENT_LIST_ITEM_NEXT_BATCH_KEY = 'TALENT_LIST_ITEM_NEXT_BATCH_KEY'

const getQueryContext = (talentIndex: number) => {
  // We don't need any batching so `ABORT_KEY` is used to disable default behaviour
  if (talentIndex === 0) {
    return { [ABORT_KEY]: TALENT_LIST_ITEM_FIRST_ABORT_KEY }
  }

  // Next 2 items are batched separately for scrolling
  if (talentIndex <= 2) {
    return { [BATCH_KEY]: TALENT_LIST_ITEM_NEXT_BATCH_KEY }
  }

  // Next items are batched as per default
  return undefined
}

export const GET_TALENT_LIST_ITEM = gql`
  query GetTalentListItem($talentId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentsListItemFragment

        jobPreferences {
          ...TalentJobPreferencesFragment
        }
      }
    }
  }

  ${TALENTS_LIST_ITEM_FRAGMENT}
  ${TALENT_JOB_PREFERENCES_FRAGMENT}
`

export const GET_JOB_TALENT_LIST_ITEM = gql`
  query GetJobTalentListItem($talentId: ID!, $jobId: ID!) {
    node(id: $talentId) {
      ... on Talent {
        id
        ...TalentsListItemFragment

        operations {
          ...JobCandidateOperationsFragment
        }

        jobPreferences(jobId: $jobId) {
          ...TalentJobPreferencesFragment
        }
      }
    }
  }

  ${TALENTS_LIST_ITEM_FRAGMENT}
  ${JOB_CANDIDATE_OPERATIONS_FRAGMENT}
  ${TALENT_JOB_PREFERENCES_FRAGMENT}
`

export const useGetTalentListItem = (
  talentId: string,
  jobId: string | undefined,
  talentIndex: number
) => {
  const talentResult = useGetNode<
    { node?: TalentListItemType | null },
    GetTalentListItemQueryVariables
  >(GetTalentListItemDocument)(
    { talentId },
    {
      skip: !!jobId,
      context: getQueryContext(talentIndex)
    }
  )

  const jobCandidateResult = useGetNode(GetJobTalentListItemDocument)(
    { talentId, jobId: jobId as string },
    {
      skip: !jobId,
      context: getQueryContext(talentIndex)
    }
  )

  return !jobId ? talentResult : jobCandidateResult
}
