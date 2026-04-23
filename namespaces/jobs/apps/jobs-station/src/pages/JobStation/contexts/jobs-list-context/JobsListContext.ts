import React, { useContext } from 'react'

export interface JobListContextProps {
  refreshJobList: () => void
  closeExpandedJob: () => void
}

export const JobListContext = React.createContext<JobListContextProps>({
  refreshJobList: () => {},
  closeExpandedJob: () => {}
})

export const useJobListContext = () => {
  return useContext(JobListContext)
}
