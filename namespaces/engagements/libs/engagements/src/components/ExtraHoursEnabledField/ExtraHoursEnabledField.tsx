import { Tooltip, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import React from 'react'
import {
  Operation,
  UpdateEngagementExtraHoursEnabledInput
} from '@staff-portal/graphql/staff'
import { isOperationEnabled } from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { EditableField } from '@staff-portal/editable'

import {
  useUpdateEngagementExtraHoursEnabled,
  getLazyEngagementExtraHoursHook
} from './data'

const OPTIONS = [
  { text: 'Yes', value: 'true' },
  { text: 'No', value: 'false' }
]

type Props = {
  engagementId: string
  extraHoursEnabled: boolean
  operation: Operation
}

type Input = UpdateEngagementExtraHoursEnabledInput

const ExtraHoursEnabledField = ({
  engagementId,
  extraHoursEnabled,
  operation: updateEngagementExtraHoursEnabledOperation
}: Props) => {
  const textValue = extraHoursEnabled ? 'Yes' : 'No'
  const { handleMutationResult } = useHandleMutationResult()
  const [updateEngagementExtraHoursEnabled] =
    useUpdateEngagementExtraHoursEnabled({})

  const handleChange = async (key: keyof Input, values: Partial<Input>) => {
    const newValue = Boolean(values[key] === 'true')

    if (extraHoursEnabled === newValue) {
      return
    }

    const { data } = await updateEngagementExtraHoursEnabled({
      variables: {
        input: { engagementId, extraHoursEnabled: newValue }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateEngagementExtraHoursEnabled
    })
  }

  return (
    <EditableField<Input, string>
      width='small'
      name='extraHoursEnabled'
      onChange={handleChange}
      viewer={
        <Tooltip
          interactive
          maxWidth='default'
          content='Changes to this setting will take effect immediately for the current billing cycle, and will generate notifications to the client and talent.'
        >
          <Typography weight='semibold' size='medium'>
            {textValue}
          </Typography>
        </Tooltip>
      }
      value={String(extraHoursEnabled)}
      queryValue={getLazyEngagementExtraHoursHook(engagementId)}
      disabled={!isOperationEnabled(updateEngagementExtraHoursEnabledOperation)}
      editor={({ ...props }) => (
        <Form.Select {...props} options={OPTIONS} size='small' width='full' />
      )}
    />
  )
}

export default ExtraHoursEnabledField
