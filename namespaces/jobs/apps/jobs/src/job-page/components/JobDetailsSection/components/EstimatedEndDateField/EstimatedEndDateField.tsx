import React, { useMemo } from 'react'
import {
  Maybe,
  Operation,
  Scalars,
  TimeZone,
  UpdateJobEstimatedEndDateInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'

import { useUpdateEstimatedEndDate } from './hooks/use-update-estimated-end-date'
import { getLazyEstimatedEndDate } from './hooks/get-lazy-estimated-end-date'
import { EstimatedEndDateViewer } from './components'

interface Props {
  jobId: string
  predictedTimeZone?: Maybe<Partial<TimeZone>>
  estimatedEndDate?: Maybe<Scalars['Date']>
  operation: Operation | undefined
}

const EstimatedEndDateField = ({
  jobId,
  estimatedEndDate,
  operation
}: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])
  const useGetLazyEstimatedEndDate = getLazyEstimatedEndDate(jobId)
  const { handleChange } = useUpdateEstimatedEndDate(jobId)

  const disabled = !isOperationEnabled(operation)

  return (
    <EditableField<
      Pick<UpdateJobEstimatedEndDateInput, 'estimatedEndDate'>,
      Scalars['Date'] | null | undefined
    >
      name='estimatedEndDate'
      value={estimatedEndDate}
      disabled={disabled}
      onChange={handleChange}
      queryValue={useGetLazyEstimatedEndDate}
      updateOnBlur
      viewer={
        <EstimatedEndDateViewer
          estimatedEndDate={estimatedEndDate}
          operation={operation}
        />
      }
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          onResetClick={() => props.onReset?.()}
          autoFocus
          enableReset
          size='small'
          width='shrink'
          minDate={minDate}
        />
      )}
    />
  )
}

export default EstimatedEndDateField
