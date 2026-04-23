import { Form, useField } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import React, { useMemo } from 'react'
import {
  InterviewCommunicationType,
  InterviewInitiator,
  InterviewKind
} from '@staff-portal/graphql/staff'

import { INTERVIEW_COMMUNICATION_FIELD_NAME } from '../../config'
type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
> & {
  kind: InterviewKind
}

const FormInterviewInitiatorSelect = ({ kind, ...props }: Props) => {
  const {
    input: { value: communicationType }
  } = useField<InterviewCommunicationType>(INTERVIEW_COMMUNICATION_FIELD_NAME)

  const options = useMemo(
    () => [
      {
        value: InterviewInitiator.INTERVIEWER,
        text:
          kind === InterviewKind.EXTERNAL
            ? 'The company will initiate the interview'
            : 'The interviewer will initiate the interview'
      },
      {
        value: InterviewInitiator.CANDIDATE,
        text: 'The candidate will initiate the interview'
      }
    ],
    [kind]
  )

  if (
    communicationType === InterviewCommunicationType.BLUEJEANS ||
    communicationType === InterviewCommunicationType.ZOOM
  ) {
    return null
  }

  return (
    <Form.Select
      data-testid='FormInterviewInitiatorSelect'
      {...props}
      options={options}
    />
  )
}

export default FormInterviewInitiatorSelect
