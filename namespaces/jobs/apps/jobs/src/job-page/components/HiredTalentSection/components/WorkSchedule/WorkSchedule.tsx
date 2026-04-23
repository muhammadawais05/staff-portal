import React from 'react'
import { useMessageEmitter } from '@toptal/staff-portal-message-bus'
import pluralize from 'pluralize'
import { UpdateEngagementWeeklyHoursInput } from '@staff-portal/graphql/staff'
import { useMutation } from '@staff-portal/data-layer-service'
import { EditableNumberInput, EditableField } from '@staff-portal/editable'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'

import { UpdateEngagementWeeklyHoursDocument } from './data/update-weekly-hours/update-weekly-hours.staff.gql.types'
import { getLazyWeeklyHoursHook } from './data'
import { workScheduleValidator } from './utils/work-schedule-validator'

interface Props {
  engagementId: string
  weeklyHours: number
  disabled?: boolean
}

type InputType = UpdateEngagementWeeklyHoursInput

const WorkSchedule = ({
  engagementId,
  weeklyHours,
  disabled = false
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const emitMessage = useMessageEmitter()
  const [updateEngagementWeeklyHours] = useMutation(
    UpdateEngagementWeeklyHoursDocument
  )

  const handleOnChange = async (
    key: keyof InputType,
    values: Partial<InputType>
  ) => {
    const { data } = await updateEngagementWeeklyHours({
      variables: {
        input: { engagementId, weeklyHours: Number(values.weeklyHours) }
      }
    })

    return handleMutationResult({
      mutationResult: data?.updateEngagementWeeklyHours,
      onSuccessAction: () => emitMessage(ENGAGEMENT_UPDATED, { engagementId })
    })
  }

  return (
    <EditableField<InputType>
      disabled={disabled}
      width='auto'
      name='weeklyHours'
      updateOnBlur
      onChange={handleOnChange}
      value={String(weeklyHours)}
      queryValue={getLazyWeeklyHoursHook(engagementId)}
      viewer={`${pluralize('hour', weeklyHours, true)} per week`}
      editor={props => (
        <EditableNumberInput
          {...props}
          hideControls
          step='any'
          validate={workScheduleValidator}
          required
        />
      )}
    />
  )
}

export default WorkSchedule
