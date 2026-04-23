import React, { useMemo } from 'react'
import { Typography } from '@toptal/picasso'
import { addDays, parseAndFormatDate } from '@staff-portal/date-time-utils'
import {
  Scalars,
  UpdateInactivityRejectionDeadlineInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { MIN_RESTRICTION_DAYS } from '../../config'
import { UpdateInactivityRejectionDeadlineDocument } from '../../data/update-rejection-deadline/update-rejection-deadline.staff.gql.types'
import { Deadline } from '../../types'
import { getInactivityRejectionDeadlineHook } from '../../utils/get-inactivity-rejection-deadline-hook/get-inactivity-rejection-deadline-hook'

interface Props {
  deadline: Deadline
  talentId: string
}

const EditableRejectionDeadline = ({ deadline, talentId }: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => addDays(new Date(), MIN_RESTRICTION_DAYS), [])

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: UpdateInactivityRejectionDeadlineDocument,
    // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
    initialValues: {
      rejectionDate: deadline.date as Scalars['Date']
    },
    requiredValues: { inactivityRejectionDeadlineId: deadline.id },
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: TALENT_UPDATED,
        payload: { talentId }
      }
    }
  })

  return (
    <EditableField<
      Pick<UpdateInactivityRejectionDeadlineInput, 'rejectionDate'>,
      Scalars['Date'] | null | undefined
    >
      name='rejectionDate'
      alignItems='center'
      disabled={!isOperationEnabled(deadline?.operation)}
      // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
      value={deadline.date as Scalars['Date']}
      onChange={handleChange}
      queryValue={getInactivityRejectionDeadlineHook(deadline.id)}
      viewer={
        <Typography weight='semibold' size='medium'>
          {parseAndFormatDate(deadline.date)}
        </Typography>
      }
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          size='small'
          autoFocus
          required
          minDate={minDate}
        />
      )}
    />
  )
}

export default EditableRejectionDeadline
