import { Form } from '@toptal/picasso-forms'
import React from 'react'

export interface Props {
  jobLongshotReasons: string[]
}

const LongShotReasons = ({ jobLongshotReasons }: Props) => {
  if (!jobLongshotReasons.length) {
    return null
  }

  return (
    <Form.CheckboxGroup
      name='longshotReasons'
      label='Longshot reasons'
      titleCase={false}
      horizontal
    >
      {jobLongshotReasons.map(reason => (
        <Form.Checkbox
          key={reason}
          label={reason}
          value={reason}
          titleCase={false}
        />
      ))}
    </Form.CheckboxGroup>
  )
}

export default LongShotReasons
