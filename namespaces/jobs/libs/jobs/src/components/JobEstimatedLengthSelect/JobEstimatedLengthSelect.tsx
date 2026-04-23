import React from 'react'
import { Form } from '@toptal/picasso-forms'

import { ESTIMATED_LENGTH_MAPPING } from '../../config'

const mappedOptions = Object.entries(ESTIMATED_LENGTH_MAPPING).map(
  ([value, text]) => ({ value, text })
)

interface Props {
  required?: boolean
}

const JobEstimatedLengthSelect = ({ required }: Props) => (
  <Form.Select
    width='full'
    name='estimatedLength'
    options={mappedOptions}
    required={required}
  />
)

export default JobEstimatedLengthSelect
