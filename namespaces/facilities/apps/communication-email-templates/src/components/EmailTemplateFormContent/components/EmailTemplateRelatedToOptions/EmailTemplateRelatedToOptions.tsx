import React, { useMemo } from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import { EmailTemplateSendingFromOption } from '@staff-portal/graphql/staff'

import { SENDING_FROM_FIELD } from '../../config'

const RELATED_TO_OPTIONS_MAP: Record<EmailTemplateSendingFromOption, string> = {
  [EmailTemplateSendingFromOption.JOB_APPLICATION]: 'Job Application',
  [EmailTemplateSendingFromOption.ENGAGEMENT]: 'Engagement',
  [EmailTemplateSendingFromOption.PROFILE]: 'Profile',
  [EmailTemplateSendingFromOption.JOB]: 'Job',
  [EmailTemplateSendingFromOption.MEETING]: 'Meeting',
  [EmailTemplateSendingFromOption.BACKGROUND]: 'Background'
}

const EmailTemplateRelatedToOptions = () => {
  const options = useMemo(
    () =>
      Object.entries(RELATED_TO_OPTIONS_MAP).map(([value, label]) => (
        <Form.Checkbox
          name={SENDING_FROM_FIELD}
          label={label}
          value={value}
          key={value}
        />
      )),
    []
  )

  return (
    <GridItemField
      label='Related to'
      labelFor={SENDING_FROM_FIELD}
      size='medium'
    >
      <Form.CheckboxGroup name='Related to'>{options}</Form.CheckboxGroup>
    </GridItemField>
  )
}

export default EmailTemplateRelatedToOptions
