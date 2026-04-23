import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import { useGetLongshotReasons } from './data/get-longshot-reasons'

const JobLongshotReasonsCheckbox = () => {
  const { jobLongshotReasons, loading } = useGetLongshotReasons()

  if (loading) {
    return null
  }

  return (
    <GridItemField
      label='Longshot Reasons'
      labelFor='longshotReasons'
      size='medium'
    >
      <Form.CheckboxGroup name='longshotReasons'>
        {jobLongshotReasons.map((reason, index) => (
          <Form.Checkbox
            label={reason}
            value={reason}
            titleCase={false}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            width='full'
          />
        ))}
      </Form.CheckboxGroup>
    </GridItemField>
  )
}

export default JobLongshotReasonsCheckbox
