import { PlaybookTemplateDateRuleUnit } from '@staff-portal/graphql/staff'
import { toStartCase } from '@staff-portal/string'
import pluralize from 'pluralize'

type Props = {
  dueDateRuleUnit?: PlaybookTemplateDateRuleUnit
  dueDateRuleAmount?: number
}

export const dueDateFormat = ({
  dueDateRuleUnit,
  dueDateRuleAmount
}: Props) => {
  const dayPluralized = pluralize('day', dueDateRuleAmount)
  const isToday = dueDateRuleAmount === 0
  const todayDescription = 'Today or next business day'

  switch (dueDateRuleUnit) {
    case PlaybookTemplateDateRuleUnit.DAYS:
      return isToday ? 'Today' : `In ${dueDateRuleAmount} ${dayPluralized}`
    case PlaybookTemplateDateRuleUnit.BUSINESS_DAYS:
      return isToday
        ? todayDescription
        : `In ${dueDateRuleAmount} business ${dayPluralized}`
    case PlaybookTemplateDateRuleUnit.WORKDAYS:
      return isToday
        ? todayDescription
        : `In ${dueDateRuleAmount} working ${dayPluralized}`
    case PlaybookTemplateDateRuleUnit.WORKDAY_AFTER_DAYS:
      return isToday
        ? todayDescription
        : `Workday after ${dueDateRuleAmount} ${dayPluralized}`
    default:
      return ''
  }
}

export const recurringFormat = ({ recurring }: { recurring: number }) =>
  `Every ${recurring === 1 ? '' : `${recurring} `}${pluralize(
    'day',
    recurring
  )}`

export const humanize = (str: string) => toStartCase(str).replace(/[/_]/g, ' ')
