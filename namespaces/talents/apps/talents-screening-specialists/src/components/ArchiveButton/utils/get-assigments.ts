import { Talent } from '@staff-portal/talents-screening-specialists'
import { SpecialistAssignmentStatuses } from '@staff-portal/graphql/staff'

export const getAssigments = (selectedTalentList: Talent[]) =>
  selectedTalentList
    .map(talent => talent.currentSpecialistAssignment)
    .filter(
      assignment => assignment?.status === SpecialistAssignmentStatuses.ACTIVE
    )

export const getAssigmentIds = (selectedTalentList: Talent[]) =>
  selectedTalentList
    .filter(
      talent =>
        talent.currentSpecialistAssignment?.status ===
        SpecialistAssignmentStatuses.ACTIVE
    )
    .map(talent => talent.currentSpecialistAssignment!.id) // eslint-disable-line @typescript-eslint/no-non-null-assertion
