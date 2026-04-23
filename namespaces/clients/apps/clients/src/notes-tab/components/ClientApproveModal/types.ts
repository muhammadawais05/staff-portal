import { ApproveClientInput } from '@staff-portal/graphql/staff'

export type ClientApproveForm = Omit<
  ApproveClientInput,
  | 'clientId'
  | 'toptalProjects'
  | 'businessModels'
  | 'seamlessMatchingAccepted'
  | 'currentEmployeeCount'
> & {
  businessModels: { value: string; text: string }[]
  toptalProjects?: string
  seamlessMatchingAccepted?: string
  currentEmployeeCount?: string
}
