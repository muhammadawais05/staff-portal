import { isEmpty } from 'lodash-es'
import i18n from '@staff-portal/billing/src/utils/i18n'

import { TimesheetModalFormInput } from '../../modals/TimesheetModal/components/TimesheetModalForm/TimesheetModalForm'
import { TimesheetEditFormInput } from '../timesheet'

export const getValidatorTimesheetEditForm = ({
  timesheetRecords
}: TimesheetModalFormInput) => {
  const formError = {
    timesheetRecords: [] as TimesheetEditFormInput[]
  }

  timesheetRecords.forEach(
    // eslint-disable-next-line complexity
    ({ hours, isBreak, minutes }) => {
      const fieldErrors: { [key: string]: string } = {}

      const castedHours = Number(hours)
      const castedMinutes = Number(minutes)

      if (isBreak) {
        if (castedMinutes) {
          fieldErrors.minutes = i18n.t('common:validation.equal', {
            unit: 'Minutes',
            value: 0
          })
        }

        if (castedHours) {
          fieldErrors.hours = i18n.t('common:validation.equal', {
            unit: 'Hours',
            value: 0
          })
        }
      } else {
        if (castedHours > 24) {
          fieldErrors.hours = i18n.t('common:validation.lessOrEqual', {
            unit: 'Hours',
            value: 24
          })
        } else if (castedHours < 0) {
          fieldErrors.hours = i18n.t('common:validation.greatOrEqual', {
            unit: 'Hours',
            value: 0
          })
        } else if (castedHours !== 24 && castedHours > 0) {
          if (castedMinutes > 59) {
            fieldErrors.minutes = i18n.t('common:validation.lessOrEqual', {
              unit: 'Minutes',
              value: 59
            })
          } else if (castedMinutes < 0) {
            fieldErrors.minutes = i18n.t('common:validation.greatOrEqual', {
              unit: 'Minutes',
              value: 0
            })
          }
        } else if (castedHours === 24) {
          if (castedMinutes) {
            fieldErrors.minutes = i18n.t('common:validation.equal', {
              unit: 'Minutes',
              value: 0
            })
          }
        } else if (!castedHours) {
          if (castedMinutes < 15 && !!castedMinutes) {
            fieldErrors.minutes = i18n.t('common:validation.greatOrEqual', {
              unit: 'Minutes',
              value: 15
            })
          } else if (castedMinutes > 59) {
            fieldErrors.minutes = i18n.t('common:validation.lessOrEqual', {
              unit: 'Minutes',
              value: 59
            })
          }
        }
      }

      formError.timesheetRecords.push(fieldErrors as never)
    }
  )

  if (
    formError.timesheetRecords.some(
      timesheetRecord => !isEmpty(timesheetRecord)
    )
  ) {
    return formError
  }

  return undefined
}
