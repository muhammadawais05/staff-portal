import { Scalars } from '@staff-portal/graphql/staff'

export type ApproveCommitmentChangeRequestFormValues = {
  companyRate: string
  talentRate: string
  changeDate: Scalars['Date']
  notifyTalent?: boolean
  notifyCompany?: boolean
}
