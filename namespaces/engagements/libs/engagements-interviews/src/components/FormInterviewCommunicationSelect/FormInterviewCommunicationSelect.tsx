import { Form } from '@toptal/picasso-forms'
import { Props as FormSelectProps } from '@toptal/picasso-forms/Select/Select'
import React from 'react'
import { InterviewCommunicationType } from '@staff-portal/graphql/staff'

import { INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING } from './config'

const OPTIONS = [
  {
    text: INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
      InterviewCommunicationType.PHONE
    ],
    value: InterviewCommunicationType.PHONE
  },
  {
    text: INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
      InterviewCommunicationType.SKYPE
    ],
    value: InterviewCommunicationType.SKYPE
  },
  {
    text: INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
      InterviewCommunicationType.BLUEJEANS
    ],
    value: InterviewCommunicationType.BLUEJEANS
  },
  {
    text: INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
      InterviewCommunicationType.ZOOM
    ],
    value: InterviewCommunicationType.ZOOM
  },
  {
    text: INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
      InterviewCommunicationType.CUSTOM_WEB_CONFERENCE
    ],
    value: InterviewCommunicationType.CUSTOM_WEB_CONFERENCE
  }
]

const getOptions = (isZoomSupported: boolean) => {
  if (isZoomSupported) {
    return OPTIONS
  }

  return OPTIONS.filter(
    option => option.value !== InterviewCommunicationType.ZOOM
  )
}

type Props = Pick<
  FormSelectProps<string>,
  'name' | 'label' | 'width' | 'required'
> & {
  hint?: string
  isZoomSupported: boolean
}

const FormInterviewCommunicationSelect = (props: Props) => {
  const { isZoomSupported, ...rest } = props

  return (
    <Form.Select
      {...rest}
      options={getOptions(isZoomSupported)}
      data-testid='FormInterviewCommunicationSelect'
    />
  )
}

export default FormInterviewCommunicationSelect
