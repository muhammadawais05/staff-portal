import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'
import { JobCreationOrigin } from '@staff-portal/graphql/staff'

const FIELD_NAME = 'jobOrigin'

const JobOriginRadio = () => (
  <GridItemField
    label='Job Origin'
    labelFor={FIELD_NAME}
    required
    size='medium'
  >
    <Form.RadioGroup
      id={FIELD_NAME}
      name={FIELD_NAME}
      horizontal
      required
      hint='If the job was requested through a call from the iOS app select "Mobile App", otherwise keep "Platform".'
    >
      <Form.Radio label='Platform' value={JobCreationOrigin.PLATFORM} />
      <Form.Radio label='Mobile App' value={JobCreationOrigin.MOBILE} />
      <Form.Radio label='Desktop App' value={JobCreationOrigin.DESKTOP_APP} />
    </Form.RadioGroup>
  </GridItemField>
)

export default JobOriginRadio
