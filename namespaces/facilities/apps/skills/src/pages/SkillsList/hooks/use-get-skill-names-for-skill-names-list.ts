import { useGetUserVerticals } from '@staff-portal/verticals'

import { useGetLazySkillNamesList } from '../../../data/get-skill-names-list'
import { toGqlVariables } from '../../../services'
import { SkillNamesQueryParams } from './use-handle-skill-names-list-filters'

const useGetSkillNamesForSkillNamesList = ({
  filterValues,
  pagination
}: {
  filterValues: SkillNamesQueryParams
  pagination: { offset: number; limit: number }
}) => {
  const { data: availableVerticals } = useGetUserVerticals()
  const { data, loading, refetch } = useGetLazySkillNamesList(
    toGqlVariables(filterValues, availableVerticals, pagination)
  )

  return {
    data,
    loading,
    refetch
  }
}

export default useGetSkillNamesForSkillNamesList
