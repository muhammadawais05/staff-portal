import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import JobCreateVerticalsField from './components/JobCreateVerticalsField/JobCreateVerticalsField'

const JobCreateBasicInfoForm = () => (
  <>
    <JobCreateVerticalsField />
    <GridItemField label='Job Title' labelFor='title' required>
      <Form.Input
        name='title'
        width='full'
        id='title'
        data-lpignore='true'
        required
      />
    </GridItemField>
    <GridItemField label='Job Description' labelFor='description' required>
      <Form.Input
        id='description'
        name='description'
        placeholder='Describe the job...'
        rows={5}
        rowsMax={25}
        width='full'
        multiline
        multilineResizable
        required
      />
    </GridItemField>
  </>
)

export default JobCreateBasicInfoForm
