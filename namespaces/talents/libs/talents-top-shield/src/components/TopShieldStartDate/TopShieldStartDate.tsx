import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import { formatDate } from '@staff-portal/date-time-utils'
import { EditableField } from '@staff-portal/editable'
import {
  Maybe,
  Scalars,
  UpdateTopShieldApplicationStartDateInput
} from '@staff-portal/graphql/staff'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { useUpdateStartDate } from './hooks/use-update-start-date'
import { getLazyStartDate } from './hooks/get-lazy-start-date'

interface Props {
  talentId: string
  applicationId: string
  date?: Maybe<Scalars['Date']>
  endDate?: Maybe<Scalars['Date']>
  operationDisabled: boolean | undefined
}

const TopShieldStartDate = ({
  talentId,
  applicationId,
  date,
  endDate,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateStartDate(applicationId)

  const maxDate = endDate ? new Date(endDate) : undefined

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationStartDateInput, 'startDate'>,
      Scalars['Date'] | null | undefined
    >
      name='startDate'
      disabled={operationDisabled}
      value={date}
      updateOnBlur
      onChange={handleChange}
      queryValue={getLazyStartDate(talentId)}
      editor={props => (
        <FormDatePickerWrapper
          {...props}
          onResetClick={props.onReset}
          autoFocus
          enableReset
          size='small'
          width='shrink'
          maxDate={maxDate}
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
