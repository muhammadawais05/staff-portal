import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import {
  Maybe,
  Scalars,
  UpdateTopShieldApplicationInitialPitchDateInput
} from '@staff-portal/graphql/staff'
import { formatDate } from '@staff-portal/date-time-utils'
import { EditableField } from '@staff-portal/editable'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { useUpdateInitialPitchDate } from './hooks/use-update-initial-pitch-date'
import { getLazyInitialPitchDate } from './hooks/get-lazy-initial-pitch-date'

interface Props {
  talentId: string
  applicationId: string
  date?: Maybe<Scalars['Date']>
  operationDisabled: boolean | undefined
}

const TopShieldInitialPitchDate = ({
  talentId,
  applicationId,
  date,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateInitialPitchDate(applicationId)

  return (
    <EditableField<
      Pick<UpdateTopShieldApplicationInitialPitchDateInput, 'initialPitchDate'>,
      Scalars['Date'] | null | undefined
    >
      name='initialPitchDate'
      disabled={operationDisabled}
      value={date}
      updateOnBlur
      onChange={handleChange}
      queryValue={getLazyInitialPitchDate(talentId)}
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

export default TopShieldInitialPitchDate
