import { useMemo } from 'react'
import { QueryParams } from '@staff-portal/query-params-state'
import { useGetUserVerticals } from '@staff-portal/verticals'
import {
  getGqlJobId,
  useGetTalentListJobData,
  useGetJobCandidates,
  useGetTalentsList
} from '@staff-portal/talents-list'

interface Props {
  filterValues: QueryParams
  page?: number
  resolvingFilters?: boolean
}

const useTalentListItems = ({
  filterValues,
  page = 1,
  resolvingFilters = false
}: Props) => {
  const jobId = useMemo(
    () => getGqlJobId(filterValues.job_id),
    [filterValues.job_id]
  )
  const isJobContext = !!jobId
  const skipLoadingVerticals = !filterValues.roles
  const { data: verticals, initialLoading: verticalsLoading } =
    useGetUserVerticals({ skip: skipLoadingVerticals })

  const queryDataLoading = resolvingFilters || verticalsLoading

  const { data: talentsData, loading: talentsLoading } = useGetTalentsList({
    filterValues,
    page,
    verticals,
    skip: queryDataLoading || isJobContext
  })
  const {
    data: jobCandidatesData,
    loading: jobCandidatesLoading,
    refetch: refetchJobCandidates
  } = useGetJobCandidates({
    filterValues,
    page,
    verticals,
    skip: queryDataLoading || !isJobContext
  })

  const { data: jobData } = useGetTalentListJobData(jobId)

  if (isJobContext) {
    return {
      jobId,
      jobData,
      refetchJobCandidates,
      talents: jobCandidatesData?.talents,
      totalCount: jobCandidatesData?.totalCount || 0,
      loading: jobCandidatesLoading || queryDataLoading
    }
  }

  return {
    talents: talentsData?.talents,
    totalCount: talentsData?.totalCount || 0,
    loading: talentsLoading || queryDataLoading
  }
}

export default useTalentListItems
