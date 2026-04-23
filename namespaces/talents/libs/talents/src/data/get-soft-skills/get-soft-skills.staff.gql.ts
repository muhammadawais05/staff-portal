import {
  gql,
  useLazyQuery,
  WatchQueryFetchPolicy
} from '@staff-portal/data-layer-service'
import { NOTE_SOFT_SKILL_FRAGMENT } from '@staff-portal/notes'
import { useCallback } from 'react'

import { GetSoftSkillsDocument } from './get-soft-skills.staff.gql.types'
import type { GetSoftSkillsQuery } from './get-soft-skills.staff.gql.types'

export default gql`
  query GetSoftSkills {
    softSkills {
      nodes {
        ...NoteSoftSkillFragment
      }
    }
  }

  ${NOTE_SOFT_SKILL_FRAGMENT}
`

export const useGetSoftSkills = ({
  onCompleted,
  fetchPolicy
}: {
  onCompleted?: (data: GetSoftSkillsQuery | undefined) => void
  fetchPolicy?: WatchQueryFetchPolicy
}) => {
  const [fetch, { data, ...restOptions }] = useLazyQuery(
    GetSoftSkillsDocument,
    {
      onCompleted,
      fetchPolicy
    }
  )

  const getSoftSkills = useCallback(fetch, [fetch])

  return {
    softSkills: data?.softSkills.nodes,
    getSoftSkills,
    ...restOptions
  }
}
