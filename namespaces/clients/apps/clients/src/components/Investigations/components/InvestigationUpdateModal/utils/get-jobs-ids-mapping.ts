import { InvestigationJobFragment } from '../../../data'

export const getJobsIdsMapping = (jobs: InvestigationJobFragment[] = []) => {
  const list: string[] = []
  const map = jobs.reduce((acc, job) => {
    const { id } = job

    list.push(id)
    acc[id] = id

    return acc
  }, {} as Record<string, string>)

  return {
    list,
    map
  }
}
