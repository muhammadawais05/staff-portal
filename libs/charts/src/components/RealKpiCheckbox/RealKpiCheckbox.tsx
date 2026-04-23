import React, { memo } from 'react'
import { Form } from '@toptal/picasso-forms'

const RealKpiCheckbox = memo(() => (
  <Form.Checkbox
    label='Display Real KPI Values'
    name='realKpiValue'
    titleCase={false}
  />
))

export default RealKpiCheckbox
