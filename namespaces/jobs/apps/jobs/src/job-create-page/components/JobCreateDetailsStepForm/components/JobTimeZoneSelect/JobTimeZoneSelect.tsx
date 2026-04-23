import React from 'react'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { GridItemField } from '@staff-portal/ui'

const FIELD_NAME = 'timeZoneName'

const JobTimeZoneSelect = () => (
  <GridItemField
    label='Job Timezone'
    labelFor={FIELD_NAME}
    required
    size='medium'
  >
    <FormTimeZoneSelect
      id={FIELD_NAME}
      name={FIELD_NAME}
      width='full'
      required
    />
  </GridItemField>
)

export default JobTimeZoneSelect
