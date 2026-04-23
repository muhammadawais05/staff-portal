import { CompanyAction } from '@staff-portal/graphql/staff'

const NO_FIELD = 'Not specified'
const NO_DESCRIPTION = 'Description not specified.'
const NO_NOTES = 'Currently, there are no notes or activities logged.'
const NO_DRAFT_JOB = 'Currently, there is no Draft Job.'

const COMMUNICATION_NOTE_COMPANY_ACTIONS_LABEL_MAPPING: Record<
  CompanyAction,
  string
> = {
  [CompanyAction.APPROVE]: 'Approve Company',
  [CompanyAction.BAD_LEAD]: 'Mark as Bad Lead',
  [CompanyAction.DELETE]: 'Delete Application',
  [CompanyAction.KEEP_AS_BAD_LEAD]: 'Keep as Bad Lead',
  [CompanyAction.PAUSE]: 'Pause Company',
  [CompanyAction.REPAUSE]: 'Repause Company',
  [CompanyAction.RESTORE]: 'Restore Application',
  [CompanyAction.RESTORE_FROM_BAD_LEAD]: 'Restore from Bad Lead',
  [CompanyAction.RESUME]: 'Resume Company'
}

export {
  NO_FIELD,
  NO_DESCRIPTION,
  NO_NOTES,
  NO_DRAFT_JOB,
  COMMUNICATION_NOTE_COMPANY_ACTIONS_LABEL_MAPPING
}
