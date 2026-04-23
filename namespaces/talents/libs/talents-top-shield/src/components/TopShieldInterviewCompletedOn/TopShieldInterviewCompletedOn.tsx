import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { formatDate } from '@staff-portal/date-time-utils'
import { EditableField } from '@staff-portal/editable'
import {
  Maybe,
  Scalars,
  UpdateTopShieldApplicationInterviewCompletedDateInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { useUpdateInterviewCompletedDate } from './hooks/use-update-interview-completed-date'
import { getLazyInterviewCompletedDate } from './hooks/get-lazy-interview-completed-date'

interface Props {
  talentId: string
  applicationId: string
  date?: Maybe<Scalars['Date']>
  startDate?: Maybe<Scalars['Date']>
  operationDisabled: boolean | undefined
}

const TopShieldInterviewCompletedOn = ({
  talentId,
  applicationId,
  date,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateInterviewCompletedDate(applicationId)

  return (
    <EditableField<
      Pick<
        UpdateTopShieldApplicationInterviewCompletedDateInput,
        'interviewCompletedDate'
      >,
      Scalars['Date'] | null | undefined
    >
      name='interviewCompletedDate'
      disabled={operationDisabled}
      value={date}
      updateOnBlur
      onChange={handleChange}
      queryValue={getLazyInterviewCompletedDate(talentId)}
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          onResetClick={props.onReset}
          autoFocus
          enableReset
          size='small'
          width='shrink'
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

export default TopShieldInterviewCompletedOn
