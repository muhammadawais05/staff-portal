import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import React from 'react'
import { InterviewType } from '@staff-portal/graphql/staff'

const OPTIONS = [
  {
    value: InterviewType.GENERAL,
    text: 'General'
  },
  {
    value: InterviewType.BEHAVIORAL,
    text: 'Behavioral'
  },
  {
    value: InterviewType.TECHNICAL,
    text: 'Technical'
  },
  {
    value: InterviewType.CASE,
    text: 'Case'
  }
]

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
>

const FormInterviewTypeSelect = ({ ...props }: Props) => {
  return (
    <Form.Select
      {...props}
      options={OPTIONS}
      data-testid='FormInterviewTypeSelect'
    />
  )
}

export default FormInterviewTypeSelect
