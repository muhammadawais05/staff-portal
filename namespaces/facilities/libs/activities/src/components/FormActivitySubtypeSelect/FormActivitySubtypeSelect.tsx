import React from 'react'
import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import { ActivityType } from '@staff-portal/graphql/staff'

import { ACTIVITY_SUBTYPE_OPTIONS_MAPPING } from './config'

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
> & {
  activityType?: ActivityType
}

const FormActivitySubtypeSelect = ({ activityType, ...props }: Props) => {
  return (
    <Form.Select
      {...props}
      options={
        activityType ? ACTIVITY_SUBTYPE_OPTIONS_MAPPING[activityType] : []
      }
    />
  )
}

export default FormActivitySubtypeSelect
