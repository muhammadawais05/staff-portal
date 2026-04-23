import { cleanNumberValue } from '@staff-portal/billing/src/_lib/form/handlers'

// logic has been taken from Platform
// @see https://github.com/toptal/platform/blob/f6d84294e6d38fa69d5fb593ae84eeae3dfe77ac/apq/actions/concerns/memorandum_attributes.rb#L5
const TASK_DESCRIPTION_REGEX =
  /issue a (?<balance_type>debit|credit) memo for the amount of \$(?<amount>[,\d]+\.\d{1,2})/

export const getTaskCardInitialValues = (task: {
  id: string
  description: string
}) => {
  const matches: RegExpMatchArray | null = task.description.match(
    TASK_DESCRIPTION_REGEX
  )

  return {
    amount: Number(cleanNumberValue(matches?.groups?.amount ?? '')).toFixed(2),
    balanceType: matches?.groups?.balance_type.toUpperCase() || ''
  }
}
