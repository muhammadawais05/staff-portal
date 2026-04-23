import { Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  InterviewCommunicationType,
  InterviewKind
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import FormInterviewInitiatorSelect from './FormInterviewInitiatorSelect'

const arrangeTest = ({
  communication = InterviewCommunicationType.PHONE,
  kind = InterviewKind.EXTERNAL
}: {
  kind?: InterviewKind
  communication?: InterviewCommunicationType
} = {}) =>
  render(
    <TestWrapper>
      <Form initialValues={{ communication }} onSubmit={() => {}}>
        <FormInterviewInitiatorSelect
          name='initiator'
          label='Initiator'
          kind={kind}
        />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewInitiatorSelect', () => {
  it('hides the initiator selector if communication is Bluejeans', () => {
    arrangeTest({ communication: InterviewCommunicationType.BLUEJEANS })

    expect(
      screen.queryByTestId('FormInterviewInitiatorSelect')
    ).not.toBeInTheDocument()
  })

  it('hides the initiator selector if communication is Zoom', () => {
    arrangeTest({ communication: InterviewCommunicationType.ZOOM })

    expect(
      screen.queryByTestId('FormInterviewInitiatorSelect')
    ).not.toBeInTheDocument()
  })

  it('shows company option', async () => {
    arrangeTest()

    fireEvent.click(screen.getByLabelText('Initiator'))

    expect(
      await screen.findByText('The company will initiate the interview')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('The candidate will initiate the interview')
    ).toBeInTheDocument()
  })

  it('shows interview option', async () => {
    arrangeTest({ kind: InterviewKind.INTERNAL })

    fireEvent.click(screen.getByLabelText('Initiator'))

    expect(
      await screen.findByText('The interviewer will initiate the interview')
    ).toBeInTheDocument()
    expect(
      await screen.findByText('The candidate will initiate the interview')
    ).toBeInTheDocument()
  })
})
