import { FormDatePickerWrapper } from '@staff-portal/forms'
import { GridItemField } from '@staff-portal/ui'
import React, { useMemo } from 'react'

const FIELD_NAME = 'startDate'

const JobDesiredStartDateSelect = () => {
  // eslint-disable-next-line @miovision/disallow-date/no-new-date
  const minDate = useMemo(() => new Date(), [])

  return (
    <GridItemField
      label='Desired Start Date'
      labelFor={FIELD_NAME}
      required
      size='small'
    >
      <FormDatePickerWrapper
        id={FIELD_NAME}
        name={FIELD_NAME}
        minDate={minDate}
        required
        width='full'
      />
    </GridItemField>
  )
}

export default JobDesiredStartDateSelect
