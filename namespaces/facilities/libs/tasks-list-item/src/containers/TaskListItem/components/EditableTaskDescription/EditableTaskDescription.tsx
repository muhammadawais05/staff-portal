import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { UpdateTaskDescriptionInput } from '@staff-portal/graphql/staff'
import {
  EditableField,
  getAdjustSingleStringValue
} from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'

import { DescriptionWithTooltip } from './components/DescriptionWithTooltip'
import { UpdateTaskDescriptionDocument } from './data/update-task-description'
import { getTaskDescriptionHook } from './utils/get-representative-information-hook'

interface Props {
  taskId: string
  description: string
  disabled?: boolean
  lineThrough?: boolean
  disputed: boolean
  status: string
}

const EditableTaskDescription = ({
  taskId,
  description,
  disabled,
  lineThrough,
  disputed,
  status
}: Props) => {
  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateTaskDescriptionDocument,
    requiredValues: { taskId },
    initialValues: { description }
  })

  return (
    <EditableField<Pick<UpdateTaskDescriptionInput, 'description'>>
      name='description'
      queryValue={getTaskDescriptionHook(taskId)}
      disabled={disabled}
      updateOnBlur
      alignItems='center'
      value={description}
      showBaseErrorContainer={false}
      onChange={handleChange}
      viewer={
        <DescriptionWithTooltip
          status={status}
          lineThrough={lineThrough}
          disputed={disputed}
          description={description}
          taskId={taskId}
        />
      }
      adjustValues={getAdjustSingleStringValue('description')}
      editor={props => (
        <Form.Input {...props} autoFocus size='small' width='full' />
      )}
    />
  )
}

export default EditableTaskDescription
