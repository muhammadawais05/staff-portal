import { QueryParams } from '@staff-portal/query-params-state'
import { useGetTalentsList } from '@staff-portal/talents-list'
import { UserVerticalFragment } from '@staff-portal/verticals'

interface Props {
  filterValues: QueryParams
  page?: number,
  verticals?: UserVerticalFragment[]
  skip?: boolean
}

const useGetTalentsForCandidateList = ({
  filterValues,
  page = 1,
  verticals=[],
  skip = false
}: Props) => {
  const { data: talentsData, loading } = useGetTalentsList({
    filterValues,
    page,
    verticals,
    skip
  })

  return {
    talents: talentsData?.talents,
    totalCount: talentsData?.totalCount || 0,
    loading
  }
}

export default useGetTalentsForCandidateList
