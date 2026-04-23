import { TssTalentFragment } from './data/tss-talent-fragment.staff.gql.types'
import { SpecialistAssignmentFragment } from './data/specialist-assignment-fragment.staff.gql.types'

export type Talent = TssTalentFragment & {
  currentSpecialistAssignment?: SpecialistAssignmentFragment | null
}

export type Assignee = SpecialistAssignmentFragment['assignee']
