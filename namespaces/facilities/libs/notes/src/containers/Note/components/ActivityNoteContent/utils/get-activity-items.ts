import {
  ActivityFragment,
  ActivityContentField,
  getActivityContentMapping
} from '@staff-portal/activities'

export const getActivityItems = (note: ActivityFragment) => {
  const items = getActivityContentMapping(note)

  const activityType = items[ActivityContentField.ACTIVITY_TYPE]
  const activitySubType = items[ActivityContentField.ACTIVITY_SUB_TYPE]
  const activityDate = items[ActivityContentField.ACTIVITY_DATE]
  const duration = items[ActivityContentField.DURATION]
  const contact = items[ActivityContentField.CONTACT]
  const outcame = items[ActivityContentField.OUTCOME]

  return [
    {
      key: activityType.label,
      value: activityType.value
    },
    {
      key: activitySubType.label,
      value: activitySubType.value
    },
    {
      key: activityDate.label,
      value: activityDate.value
    },
    {
      key: duration.label,
      value: duration.value
    },
    {
      key: contact.label,
      value: contact.value
    },
    {
      key: outcame.label,
      value: outcame.value
    }
  ]
}
