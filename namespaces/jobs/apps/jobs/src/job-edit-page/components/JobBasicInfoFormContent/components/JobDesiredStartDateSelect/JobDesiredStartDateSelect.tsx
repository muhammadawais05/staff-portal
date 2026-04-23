import { FormDatePickerWrapper } from '@staff-portal/forms'
import { GridItemField } from '@staff-portal/ui'
import React, { useMemo } from 'react'

interface Props {
  required?: boolean
}

const JobDesiredStartDateSelect = ({ required }: Props) => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  return (
    <GridItemField
      label='Desired Start Date'
      labelFor='startDate'
      required={required}
      size='small'
    >
      <FormDatePickerWrapper
        id='startDate'
        name='startDate'
        minDate={minDate}
        required={required}
        width='full'
      />
    </GridItemField>
  )
}

export default JobDesiredStartDateSelect
