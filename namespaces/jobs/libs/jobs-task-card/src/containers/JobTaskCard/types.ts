import { JobTaskCardOperationsFragment, JobFragment } from './data'

export type TaskJob = JobFragment & JobTaskCardOperationsFragment

export interface Skill {
  id: string
  name: string
}
