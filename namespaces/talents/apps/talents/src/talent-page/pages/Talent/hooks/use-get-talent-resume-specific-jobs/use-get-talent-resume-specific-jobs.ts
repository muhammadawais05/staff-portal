import { useEffect, useState } from 'react'
import { Maybe, TalentResumeJob } from '@staff-portal/graphql/staff'

import { useGetTalentViewerPermissions } from '../../data/get-talent-viewer-permissions'
import { useGetTalentResumeJobs } from '../../data/get-talent-resume-jobs'

type ResumeSpecificJobsState = {
  resumeSpecificJobs?: Maybe<TalentResumeJob[]>
  loading: boolean
}

export const useGetTalentResumeSpecificJobs = (talentId: string) => {
  const [resumeSpecificJobsState, setResumeSpecificJobsState] =
    useState<ResumeSpecificJobsState>({ loading: true })
  const { viewerPermissions, loading: permissionsLoading } =
    useGetTalentViewerPermissions()

  const { fetch } = useGetTalentResumeJobs(talentId, {
    onCompleted: data => {
      setResumeSpecificJobsState({
        resumeSpecificJobs: data?.node?.resumeJobs?.nodes,
        loading: false
      })
    },
    onError: () => {
      setResumeSpecificJobsState({
        resumeSpecificJobs: null,
        loading: false
      })
    }
  })

  useEffect(() => {
    if (permissionsLoading) {
      return
    }

    if (viewerPermissions?.canViewJob) {
      fetch()
    } else {
      setResumeSpecificJobsState({
        resumeSpecificJobs: null,
        loading: false
      })
    }
  }, [fetch, viewerPermissions, permissionsLoading])

  return resumeSpecificJobsState
}
