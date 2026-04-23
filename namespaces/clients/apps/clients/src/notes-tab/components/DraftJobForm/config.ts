import { JobBudgetDetails, JobProjectType } from '@staff-portal/graphql/staff'

export const JOB_PROJECT_TYPE_OPTIONS = [
  JobProjectType.N_A,
  JobProjectType.NEW_IDEA_OR_PROJECT,
  JobProjectType.EXISTING_PROJECT_THAT_NEEDS_MORE_RESOURCES,
  JobProjectType.ONGOING_ASSISTANCE_OR_CONSULTATIONS
]

export const JOB_BUDGET_DETAILS_TYPE_OPTIONS = [
  JobBudgetDetails.RATE_SPECIFIED,
  JobBudgetDetails.NO_RATE_LIMIT,
  JobBudgetDetails.UNCERTAIN_OF_BUDGET
]

export const JOB_BUDGET_DETAILS_TYPE_MAPPING: Record<JobBudgetDetails, string> =
  {
    [JobBudgetDetails.NO_RATE_LIMIT]: 'No maximum budget',
    [JobBudgetDetails.RATE_SPECIFIED]: 'Have a budget',
    [JobBudgetDetails.UNCERTAIN_OF_BUDGET]: 'Budget still uncertain'
  }
