import {
  PlaybookTemplatePriority,
  PlaybookTemplateDateRuleUnit
} from '@staff-portal/graphql/staff'

export const PRIORITY_OPTIONS = [
  {
    text: 'High',
    value: PlaybookTemplatePriority.HIGH
  },
  {
    text: 'Medium',
    value: PlaybookTemplatePriority.MEDIUM
  },
  {
    text: 'Low',
    value: PlaybookTemplatePriority.LOW
  }
]

export const DUE_DATE_RULE_UNIT_OPTIONS = [
  {
    text: 'Days',
    value: PlaybookTemplateDateRuleUnit.DAYS
  },
  {
    text: 'Business Days',
    value: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS
  },
  {
    text: 'Workday After Days',
    value: PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS
  }
]
