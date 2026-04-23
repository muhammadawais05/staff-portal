import { ColorType } from '@toptal/picasso'
import { OptionGroups } from '@toptal/picasso/Select/types'
import {
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'

export const INFRACTION_REASON_MAPPING: Record<
  TalentInfractionReasonValue,
  { label: string; group: string }
> = {
  [TalentInfractionReasonValue.COMMUNICATION_POOR_COMMUNICATION]: {
    label:
      'Poor communication practices (cadences, content, responsiveness, etc.)',
    group: 'Communication'
  },
  [TalentInfractionReasonValue.COMMUNICATION_POOR_ENGLISH]: {
    label: 'Poor English skills',
    group: 'Communication'
  },
  [TalentInfractionReasonValue.COMMUNICATION_RUDE]: {
    label: 'Rude or unprofessional towards Client or Core Team',
    group: 'Communication'
  },
  [TalentInfractionReasonValue.COMMUNICATION_UNRESPONSIVE]: {
    label:
      'Talent is unresponsive (to Client or Toptal Core during engagement)',
    group: 'Communication'
  },
  [TalentInfractionReasonValue.LEGAL_PROBLEMS_BACKGROUND]: {
    label: 'Problems with background check',
    group: 'Legal'
  },
  [TalentInfractionReasonValue.PERFORMANCE_EXCEEDS_TIME]: {
    label: 'Project exceeds time estimates',
    group: 'Performance'
  },
  [TalentInfractionReasonValue.PERFORMANCE_FEWER_HOURS]: {
    label: 'Working fewer hours than committed (PT or FT)',
    group: 'Performance'
  },
  [TalentInfractionReasonValue.PERFORMANCE_TECHNICAL_SKILLS]: {
    label:
      "Poor technical skills or delivered work doesn't meet Toptal standards",
    group: 'Performance'
  },
  [TalentInfractionReasonValue.POLICY_VIOLATION_CIRCUMVENTION]: {
    label: 'Circumvention attempt',
    group: 'Policy violation'
  },
  [TalentInfractionReasonValue.POLICY_VIOLATION_FAKE]: {
    label: 'Fake Profile/Identity Issue',
    group: 'Policy violation'
  },
  [TalentInfractionReasonValue.POLICY_VIOLATION_OUTSOURCING]: {
    label: 'Outsourcing work',
    group: 'Policy violation'
  },
  [TalentInfractionReasonValue.RELIABILITY_LEAVES]: {
    label: 'Talent leaves engagement/trial without proper notice',
    group: 'Reliability'
  },
  [TalentInfractionReasonValue.RELIABILITY_MISREPRESENTED_LOCATION]: {
    label: 'Talent misrepresented location',
    group: 'Reliability'
  },
  [TalentInfractionReasonValue.RELIABILITY_MISREPRESENTED_SKILLS]: {
    label: 'Talent misrepresented skills',
    group: 'Reliability'
  },
  [TalentInfractionReasonValue.RELIABILITY_UNRELIABLE_BEHAVIOUR]: {
    label: 'Talent shows unreliable or untrustworthy behavior',
    group: 'Reliability'
  },
  [TalentInfractionReasonValue.OTHER_OTHER]: {
    label: 'Other',
    group: 'Other'
  }
}

export const INFRACTION_REASON_OPTION_GROUPS: OptionGroups = Object.keys(
  INFRACTION_REASON_MAPPING
).reduce((groups, slug) => {
  const reason = INFRACTION_REASON_MAPPING[slug as TalentInfractionReasonValue]

  if (!groups[reason.group]) {
    groups[reason.group] = []
  }

  groups[reason.group].push({
    value: slug,
    text: reason.label
  })

  return groups
}, {} as OptionGroups)

export const INFRACTION_STATUS_MAPPING: Record<
  TalentInfractionStatusValue,
  { text: string; color: ColorType }
> = {
  [TalentInfractionStatusValue.PENDING_REVIEW]: {
    text: 'Pending review',
    color: 'yellow'
  },
  [TalentInfractionStatusValue.PENDING_REMEDIATION]: {
    text: 'Pending remediation',
    color: 'yellow'
  },
  [TalentInfractionStatusValue.REMEDIATED]: {
    text: 'Remediated',
    color: 'green'
  },
  [TalentInfractionStatusValue.DISMISSED]: {
    text: 'Dismissed (talent not at fault)',
    color: 'inherit'
  },
  [TalentInfractionStatusValue.ARCHIVED]: {
    text: 'Archived',
    color: 'inherit'
  }
}

export const DETAILS_PLACEHOLDER = `Additional details or notes.
Describe any actions taken.
Provide link to any relevant Slack Channel.`

export const REVIEW_TEMPLATE = `------------------------------
TALENT SUCCESS REVIEW SUMMARY

HEALTH STATUS:
Watch List
Probation
Suspension
(Previously Top Performer)
Top Performer

ACTION TAKEN:
Log infraction only
Feedback email
Feedback via Slack
Coaching Conversation

FEEDBACK NOTES:
- Summary/relevant notes about coaching action taken
- Recommendations for review in 3-6 months
------------------------------`
