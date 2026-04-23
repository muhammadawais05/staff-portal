import React from 'react'
import { Typography, Container } from '@toptal/picasso'
import { NO_VALUE } from '@staff-portal/config'
import {
  Maybe,
  Scalars,
  UpdateTopShieldApplicationContractSignedDateInput
} from '@staff-portal/graphql/staff'
import { formatDate } from '@staff-portal/date-time-utils'
import { EditableField } from '@staff-portal/editable'
import { FormDatePickerWrapper } from '@staff-portal/forms'

import { useUpdateContractSignedDate } from './hooks/use-update-contract-signed-date'
import { getLazyContractSignedDate } from './hooks/get-lazy-contract-signed-date'

interface Props {
  talentId: string
  applicationId: string
  date?: Maybe<Scalars['Date']>
  operationDisabled: boolean | undefined
}

const TopShieldContractSignedDate = ({
  talentId,
  applicationId,
  date,
  operationDisabled
}: Props) => {
  const { handleChange } = useUpdateContractSignedDate(applicationId)

  return (
    <EditableField<
      Pick<
        UpdateTopShieldApplicationContractSignedDateInput,
        'contractSignedDate'
      >,
      Scalars['Date'] | null | undefined
    >
      name='contractSignedDate'
      disabled={operationDisabled}
      value={date}
      updateOnBlur
      onChange={handleChange}
      queryValue={getLazyContractSignedDate(talentId)}
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

export default TopShieldContractSignedDate
