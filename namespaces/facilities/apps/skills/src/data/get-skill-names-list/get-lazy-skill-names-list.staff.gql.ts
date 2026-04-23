import { useMemo } from 'react'
import { gql, useQuery } from '@staff-portal/data-layer-service'
import { OPERATION_FRAGMENT } from '@staff-portal/operations'

import {
  GetSkillNamesListDocument,
  GetSkillNamesListQueryVariables
} from './get-lazy-skill-names-list.staff.gql.types'

export default gql`
  query GetSkillNamesList(
    $filter: SkillNameFilter!
    $order: SkillNameOrder!
    $pagination: OffsetPagination!
  ) {
    skillNames(filter: $filter, pagination: $pagination, order: $order) {
      nodes {
        ...SkillNamesListItemFragment
      }
      totalCount
    }
  }

  fragment SkillNamesListItemFragment on SkillName {
    id
    name
    editorChecked
    verticalChecked
    skillPageSlug
    operations {
      ...SkillNamesListItemOperationsFragment
    }
    skills {
      ...SkillNamesListItemSkillFragment
    }
  }

  fragment SkillNamesListItemSkillFragment on Skill {
    id
    category {
      id
      title
      vertical {
        id
        talentType
      }
    }
  }

  fragment SkillNamesListItemOperationsFragment on SkillNameOperations {
    cloneSkillName {
      ...OperationFragment
    }
    removeSkillName {
      ...OperationFragment
    }
    toggleCheckSkillName {
      ...OperationFragment
    }
    updateSkillName {
      ...OperationFragment
    }
  }

  ${OPERATION_FRAGMENT}
`

export const useGetLazySkillNamesList = (
  variables: GetSkillNamesListQueryVariables
) => {
  const { data, error, loading, ...restOptions } = useQuery(
    GetSkillNamesListDocument,
    { variables, throwOnError: true }
  )

  const skillNamesData = useMemo(() => {
    if (!data?.skillNames) {
      return
    }

    const { nodes, totalCount } = data.skillNames

    return { skillNames: nodes, totalCount }
  }, [data])

  return {
    data: skillNamesData,
    loading,
    error,
    ...restOptions
  }
}
