import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { InterviewCommunicationType } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING } from './config'
import FormInterviewCommunicationSelect from './FormInterviewCommunicationSelect'
import { INTERVIEW_COMMUNICATION_FIELD_NAME } from '../../config'
import { ScheduleInterviewFormValues } from '../../types'

const OPTIONS = [
  INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
    InterviewCommunicationType.BLUEJEANS
  ],
  INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
    InterviewCommunicationType.CUSTOM_WEB_CONFERENCE
  ],
  INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[InterviewCommunicationType.PHONE],
  INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[InterviewCommunicationType.SKYPE]
]

const arrangeTest = (
  initialValues: Partial<ScheduleInterviewFormValues> = {},
  isZoomSupported = true
) =>
  render(
    <TestWrapper>
      <Form onSubmit={() => {}} initialValues={initialValues}>
        <FormInterviewCommunicationSelect
          name={INTERVIEW_COMMUNICATION_FIELD_NAME}
          label='Communication'
          isZoomSupported={isZoomSupported}
        />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewCommunicationSelect', () => {
  it.each(OPTIONS)('shows %s communication option', async expected => {
    arrangeTest()

    fireEvent.click(screen.getByLabelText('Communication'))

    expect(await screen.findByText(expected)).toBeInTheDocument()
  })

  describe('when isZoomSupported is false', () => {
    it('does not show zoom as a communication option', () => {
      arrangeTest({}, false)

      fireEvent.click(screen.getByLabelText('Communication'))

      const ZOOM_OPTION =
        INTERVIEW_COMMUNICATION_TYPE_TITLE_MAPPING[
          InterviewCommunicationType.ZOOM
        ]

      expect(screen.queryByText(ZOOM_OPTION)).not.toBeInTheDocument()
    })
  })
})
