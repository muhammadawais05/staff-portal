import React, { useMemo } from 'react'
import { Typography } from '@toptal/picasso'
import { addDays, parseAndFormatDate } from '@staff-portal/date-time-utils'
import {
  Scalars,
  ChangeTalentActivationDeadlineInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapperWithTimeZone } from '@staff-portal/forms'
import { isOperationEnabled } from '@staff-portal/operations'
import { EditableField } from '@staff-portal/editable'
import { useEditableFieldChangeHandler } from '@staff-portal/mutation-result-handlers'
import { TALENT_UPDATED } from '@staff-portal/talents'

import { ChangeTalentActivationDeadlineDocument } from '../../data/change-talent-activation-deadline/change-talent-activation-deadline.staff.gql.types'
import { Deadline } from '../../types'
import { MIN_RESTRICTION_DAYS } from '../../config'
import { getActivationDeadlineHook } from '../../utils/get-activation-deadline-hook/get-activation-deadline-hook'

interface Props {
  deadline: Deadline
  talentId: string
  timeZone?: string
}

const EditableActivationDeadline = ({
  deadline,
  talentId,
  timeZone
}: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => addDays(new Date(), MIN_RESTRICTION_DAYS), [])

  const handleChange = useEditableFieldChangeHandler({
    mutationDocument: ChangeTalentActivationDeadlineDocument,
    // TODO: use helper to convert Scalars['Time'] to Scalars['Date']
    initialValues: { deadline: deadline.date as Scalars['Date'] },
    requiredValues: { talentId },
    mutationResultOptions: {
      successMessageEmitOptions: {
        type: TALENT_UPDATED,
        payload: { talentId }
      }
    }
  })

  return (
    <EditableField<
      Pick<ChangeTalentActivationDeadlineInput, 'deadline'>,
      Scalars['Time'] | null | undefined
    >
      name='deadline'
      alignItems='center'
      disabled={!isOperationEnabled(deadline?.operation)}
      value={deadline.date}
      onChange={handleChange}
      queryValue={getActivationDeadlineHook(deadline.id)}
      viewer={
        <Typography weight='semibold' size='medium'>
          {parseAndFormatDate(deadline.date, { timeZone })}
        </Typography>
      }
      updateOnBlur
      editor={props => (
        <FormDatePickerWrapperWithTimeZone
          {...props}
          size='small'
          autoFocus
          required
          minDate={minDate}
          timeZone={timeZone}
        />
      )}
    />
  )
}

export default EditableActivationDeadline
