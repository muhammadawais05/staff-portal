import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { formatDate } from '@staff-portal/date-time-utils'
import { EditableField } from '@staff-portal/editable'
import {
  Maybe,
  Scalars,
  UpdateTopShieldApplicationScheduledEndDateInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { useUpdateScheduledEndDate } from './hooks/use-update-scheduled-end-date'
import { getLazyScheduledEndDate } from './hooks/get-lazy-scheduled-end-date'

interface Props {
  talentId: string
  applicationId: string
  date?: Maybe<Scalars['Date']>
  startDate?: Maybe<Scalars['Date']>
  operationDisabled: boolean | undefined
}

const TopShieldStartDate = ({
  talentId,
  applicationId,
  date,
  startDate,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateScheduledEndDate(applicationId)

  const minDate = startDate ? new Date(startDate) : undefined

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationScheduledEndDateInput, 'scheduledEndDate'>,
      Scalars['Date'] | null | undefined
    >
      name='scheduledEndDate'
      disabled={operationDisabled}
      value={date}
      updateOnBlur
      onChange={handleChange}
      queryValue={getLazyScheduledEndDate(talentId)}
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          onResetClick={props.onReset}
          autoFocus
          enableReset
          size='small'
          width='shrink'
          minDate={minDate}
        />
      )}
      viewer={
        <Typography weight='semibold' size='medium'>
          <Container as='span' flex alignItems='center'>
            {date ? formatDate(new Date(date)) : NO_VALUE}
          </Container>
        </Typography>
      }
    />
  )
}

export default TopShieldStartDate
