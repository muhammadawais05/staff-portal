import React, { useMemo } from 'react'
import { Typography } from '@toptal/picasso'
import { parseAndFormatDate } from '@staff-portal/date-time-utils'
import { Scalars, RescheduleTaskInput } from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { NO_VALUE } from '@staff-portal/config'

import { getTaskDueDateHook } from './hooks'
import { RescheduleTaskDocument } from './data/reschedule-task'

interface Props {
  taskId: string
  dueDate?: Scalars['Date'] | null
  disabled: boolean
  lineThrough?: boolean
}

const EditableDueDate = ({ taskId, disabled, dueDate, lineThrough }: Props) => {
  const minDate = useMemo(() => new Date(), [])
  const parsedDate = parseAndFormatDate(dueDate)

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: RescheduleTaskDocument,
    initialValues: { dueDate },
    requiredValues: { taskId }
  })

  return (
    <EditableField<
      Pick<RescheduleTaskInput, 'dueDate'>,
      Scalars['Date'] | null | undefined
    >
      name='dueDate'
      alignItems='center'
      disabled={disabled}
      value={dueDate}
      showBaseErrorContainer={false}
      onChange={handleChange}
      queryValue={getTaskDueDateHook(taskId)}
      viewer={
        <Typography noWrap lineThrough={lineThrough}>
          {parsedDate || NO_VALUE}
        </Typography>
      }
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          size='small'
          width='full'
          autoFocus
          minDate={minDate}
        />
      )}
    />
  )
}

export default EditableDueDate
