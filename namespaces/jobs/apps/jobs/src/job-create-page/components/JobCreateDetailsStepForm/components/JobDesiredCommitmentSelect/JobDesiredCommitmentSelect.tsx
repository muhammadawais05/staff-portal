import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { COMMITMENT_FOR_REHIRE } from '@staff-portal/jobs'
import { GridItemField } from '@staff-portal/ui'

const commitmentOptions = Object.entries(COMMITMENT_FOR_REHIRE).map(
  ([value, text]) => ({ value, text })
)

const JobDesiredCommitmentSelect = () => (
  <GridItemField
    label='Desired Commitment'
    labelFor='commitment'
    required
    size='medium'
  >
    <Form.Select
      width='full'
      placeholder='Please specify commitment'
      id='commitment'
      name='commitment'
      options={commitmentOptions}
      required
    />
  </GridItemField>
)

export default JobDesiredCommitmentSelect
