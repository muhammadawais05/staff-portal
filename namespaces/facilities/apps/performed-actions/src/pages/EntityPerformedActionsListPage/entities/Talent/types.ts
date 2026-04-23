import { TalentPerformedActionsChangeTypeFilter } from './enums'

export type TalentPerformedActionsQueryParams = {
  change_type?: TalentPerformedActionsChangeTypeFilter[]
}

export type TalentPerformedActionsFilters = {
  changeType: TalentPerformedActionsChangeTypeFilter[]
}
