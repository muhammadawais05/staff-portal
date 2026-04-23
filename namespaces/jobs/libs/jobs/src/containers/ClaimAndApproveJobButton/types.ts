import { JobSkillSet } from '../../types'
import { ApproveJobMutationVariables, GetApproveJobDetailsQuery } from './data'

export type JobDetails = NonNullable<GetApproveJobDetailsQuery['node']>

export interface ApproveJobForm
  extends Omit<
    ApproveJobMutationVariables['input'],
    'clientMutationId' | 'jobId' | 'maxHourlyRate' | 'expectedWeeklyHours'
  > {
  noRateLimit?: boolean
  uncertainOfBudget?: boolean
  maxHourlyRate?: string | number | null
  expectedWeeklyHours?: string | number | null
  deposit?: string | null
  createDeposit?: boolean
  skills?: JobSkillSet[]
  showNoRequiredSkillsConfirmation?: boolean
}
