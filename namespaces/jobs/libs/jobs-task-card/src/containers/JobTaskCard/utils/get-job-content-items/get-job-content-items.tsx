import { TaskCardLayoutContentItem } from '@staff-portal/tasks'

import { JobFragment } from '../../data'
import { getJobContentMapping } from './get-job-content-mapping'
import { JOB_CONFIGURATION } from '../../config'

export const getJobContentItems = (
  job: JobFragment,
  timeZone?: string
): TaskCardLayoutContentItem[] => {
  const contentMapping = getJobContentMapping(job, timeZone)

  return JOB_CONFIGURATION.filter(key => contentMapping[key]).map(key => ({
    ...(contentMapping[key] as TaskCardLayoutContentItem),
    key
  }))
}
