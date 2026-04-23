import React from 'react'
import { FormTimeZoneSelect } from '@staff-portal/forms'
import { GridItemField } from '@staff-portal/ui'

import { TIMEZONE_FIELD } from '../../../../config'

const JobTimeZoneSelect = () => (
  <GridItemField
    label='Job Timezone'
    labelFor={TIMEZONE_FIELD}
    required
    size='medium'
  >
    <FormTimeZoneSelect
      id={TIMEZONE_FIELD}
      name={TIMEZONE_FIELD}
      width='full'
      required
    />
  </GridItemField>
)

export default JobTimeZoneSelect
