import React, { ReactNode, useMemo } from 'react'

import {
  JobListContext,
  JobListContextProps
} from '../../contexts/jobs-list-context/JobsListContext'

export interface Props {
  setExpandedJobId: (value: string | null) => void
  refreshJobList?: () => void
  children?: ReactNode
}

const JobsListProvider = ({
  setExpandedJobId,
  refreshJobList,
  children
}: Props) => {
  const jobsListContext = useMemo<JobListContextProps>(
    () => ({
      refreshJobList: () => refreshJobList?.(),
      closeExpandedJob: () => setExpandedJobId(null)
    }),
    [refreshJobList, setExpandedJobId]
  )

  return (
    <JobListContext.Provider value={jobsListContext}>
      {children}
    </JobListContext.Provider>
  )
}

export default JobsListProvider
