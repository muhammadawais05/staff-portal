import { ColorType } from '@toptal/picasso'
import {
  SpecialistAssignmentStatuses,
  SpecialistAssignmentArchivingReasons as ArchiveReason
} from '@staff-portal/graphql/staff'

export const INACTIVE_SPECIALIST_ASSIGNMENT_STATUS: {
  text: string
  color: ColorType
} = { text: '-', color: 'grey' }

export const SPECIALIST_ASSIGNMENT_STATUS_MAPPING: Record<
  SpecialistAssignmentStatuses,
  { text: string; color: ColorType }
> = {
  [SpecialistAssignmentStatuses.ACTIVE]: {
    text: 'Active',
    color: 'green'
  },
  [SpecialistAssignmentStatuses.ARCHIVED]: {
    text: 'Archived',
    color: 'yellow'
  },
  [SpecialistAssignmentStatuses.NONE]: INACTIVE_SPECIALIST_ASSIGNMENT_STATUS
}

export const ASSIGNMENT_ARCHIVE_REASONS = [
  { value: ArchiveReason.TALENT_NOT_INTERESTED, text: 'Talent not interested' },
  { value: ArchiveReason.TALENT_BUSY, text: 'Talent busy' },
  { value: ArchiveReason.UNRESPONSIVE, text: 'Unresponsive' },
  {
    value: ArchiveReason.NEEDS_TIME_FOR_ADDITIONAL_PREPARATION,
    text: 'Needs time for additional preparation'
  },
  { value: ArchiveReason.VISA_ISSUES, text: 'Visa issues' },
  { value: ArchiveReason.LEGAL_ISSUES, text: 'Legal issues' },
  {
    value: ArchiveReason.DECIDED_TO_APPLY_TO_A_DIFFERENT_VERTICAL,
    text: 'Decided to apply to a different vertical'
  },
  { value: ArchiveReason.DUPLICATE_PROFILE, text: 'Duplicate profile' },
  { value: ArchiveReason.COVID19, text: 'Covid-19' },
  { value: ArchiveReason.TALENT_PARTNER, text: 'Talent Partner' },
  {
    value: ArchiveReason.SKILL_NOT_A_PRIORITY_ANYMORE,
    text: 'Skill not a priority anymore'
  },
  { value: ArchiveReason.CHEATER, text: 'Cheater' },
  { value: ArchiveReason.OTHER, text: 'Other' }
]
