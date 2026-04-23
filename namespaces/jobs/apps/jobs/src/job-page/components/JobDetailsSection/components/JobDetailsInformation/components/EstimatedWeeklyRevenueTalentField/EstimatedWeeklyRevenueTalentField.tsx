import React from 'react'
import { NO_VALUE } from '@staff-portal/config'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import {
  Job,
  Operation as OperationType,
  UpdateJobEstimatedWeeklyRevenueTalentInput
} from '@staff-portal/graphql/staff'
import { Operation } from '@staff-portal/operations'
import { EditableNumberInput, EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { JOB_UPDATED } from '@staff-portal/jobs'
import { formatAmount } from '@staff-portal/string'

import {
  getLazyEstimatedWeeklyRevenueTalent,
  useUpdateJobEstimatedWeeklyRevenueTalent
} from './data'

export interface Props {
  jobId: string
  estimatedWeeklyRevenueTalent?: Job['estimatedWeeklyRevenueTalent']
  operation: OperationType | undefined
}

type InputType = UpdateJobEstimatedWeeklyRevenueTalentInput

const EstimatedWeeklyRevenueTalentField = ({
  jobId,
  estimatedWeeklyRevenueTalent,
  operation
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const [updateJobEstimatedWeeklyRevenueTalent] =
    useUpdateJobEstimatedWeeklyRevenueTalent()
  const emitMessage = useMessageEmitter()

  const handleOnChange = async (
    key: keyof InputType,
    values: Partial<InputType>
  ) => {
    const { data } = await updateJobEstimatedWeeklyRevenueTalent({
      variables: {
        input: {
          jobId,
          estimatedWeeklyRevenueTalent:
            values.estimatedWeeklyRevenueTalent ?? null
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateJobEstimatedWeeklyRevenueTalent,
      onSuccessAction: () => {
        emitMessage(JOB_UPDATED, { jobId })
      }
    })
  }

  return (
    <Operation
      operation={operation}
      render={disabled => (
        <EditableField<InputType>
          disabled={disabled}
          width='small'
          name='estimatedWeeklyRevenueTalent'
          updateOnBlur
          value={estimatedWeeklyRevenueTalent ?? undefined}
          onChange={handleOnChange}
          queryValue={getLazyEstimatedWeeklyRevenueTalent(jobId)}
          viewer={formatAmount(estimatedWeeklyRevenueTalent) ?? NO_VALUE}
          editor={props => <EditableNumberInput {...props} hideControls />}
          data-testid='EstimatedWeeklyRevenueTalent-editable-field'
        />
      )}
    />
  )
}

export default EstimatedWeeklyRevenueTalentField
