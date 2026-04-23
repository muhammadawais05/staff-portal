import {
  CompanyAction,
  JobBudgetDetails,
  JobCommitment,
  JobEstimatedLengths,
  JobHoursOverlap,
  JobProjectSpecCompleteness,
  JobProjectTeamInvolved,
  JobProjectType,
  Maybe
} from '@staff-portal/graphql/staff'
import { Item } from '@toptal/picasso/TagSelector'

import { DraftJobFormFields } from './enums/DraftJobFormFields'

export type ActionType = 'saveDraftJob' | 'saveDraftJobAndApprove'

export type BaseDraftJobFormType = {
  [DraftJobFormFields.BudgetDetails]?: Maybe<JobBudgetDetails>
  [DraftJobFormFields.Commitment]?: Maybe<JobCommitment>
  [DraftJobFormFields.Description]?: Maybe<string>
  [DraftJobFormFields.EstimatedLength]?: Maybe<JobEstimatedLengths>
  [DraftJobFormFields.HasPreferredHours]?: 'true' | 'false'
  [DraftJobFormFields.HoursOverlap]?: Maybe<JobHoursOverlap>
  [DraftJobFormFields.Industries]?: Maybe<Item[]>
  [DraftJobFormFields.MaxHourlyRate]?: Maybe<string>
  [DraftJobFormFields.ProjectSpecCompleteness]?: Maybe<JobProjectSpecCompleteness>
  [DraftJobFormFields.ProjectTeamInvolved]?: Maybe<JobProjectTeamInvolved>
  [DraftJobFormFields.ProjectType]?: Maybe<JobProjectType>
  [DraftJobFormFields.Skills]?: Maybe<Item[]>
  [DraftJobFormFields.StartDate]?: Maybe<string>
  [DraftJobFormFields.TalentCount]?: Maybe<string>
  [DraftJobFormFields.TimeZoneName]?: Maybe<string>
  [DraftJobFormFields.Title]?: Maybe<string>
  [DraftJobFormFields.VerticalId]: string
  [DraftJobFormFields.WorkingTimeFrom]?: Maybe<string>
  [DraftJobFormFields.WorkingTimeTo]?: Maybe<string>
}

export type BaseDraftJobFormTypeWithActionType = BaseDraftJobFormType & {
  action: ActionType
}

export type DefaultDraftJobFormType = BaseDraftJobFormType & {
  clientId: string
}

export type DraftJobFormType = BaseDraftJobFormType & {
  draftJobId: string
}

export enum LogSalesCallMissingAction {
  CHECK_COMPLIANCE = 'CHECK_COMPLIANCE'
}

export type LogSalesCallBusinessAction =
  | CompanyAction
  | LogSalesCallMissingAction
