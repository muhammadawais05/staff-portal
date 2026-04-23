import { useMemo } from 'react'

import { EditPlaybookTemplateFormType } from '../EditPlaybookTemplateModal'
import { PlaybookTemplateEditFragment } from '../data/get-playbook-template/get-playbook-template.staff.gql.types'

const useGetFormInitialValues = ({
  communication,
  description,
  details,
  dueDateRuleAmount,
  dueDateRuleUnit,
  finishDisabled,
  important,
  priority,
  recurring,
  rescheduleDisabled,
  slackNotificationsEnabled,
  stopRecurringAfterDispute
}: PlaybookTemplateEditFragment) => {
  return useMemo<Partial<EditPlaybookTemplateFormType>>(
    // eslint-disable-next-line complexity
    () => ({
      communication: communication ?? false,
      description: description ?? undefined,
      details,
      dueDateRuleAmount: dueDateRuleAmount ?? undefined,
      dueDateRuleUnit: dueDateRuleUnit ?? undefined,
      finishDisabled: finishDisabled ?? false,
      important: important ?? false,
      priority: priority ?? undefined,
      recurring,
      rescheduleDisabled: rescheduleDisabled ?? false,
      slackNotificationsEnabled: slackNotificationsEnabled ?? false,
      stopRecurringAfterDispute: stopRecurringAfterDispute ?? false
    }),
    [
      communication,
      description,
      details,
      dueDateRuleAmount,
      dueDateRuleUnit,
      finishDisabled,
      important,
      priority,
      recurring,
      rescheduleDisabled,
      slackNotificationsEnabled,
      stopRecurringAfterDispute
    ]
  )
}

export default useGetFormInitialValues
