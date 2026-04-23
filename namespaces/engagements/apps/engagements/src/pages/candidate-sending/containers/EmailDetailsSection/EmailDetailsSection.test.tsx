import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'

import EmailDetailsSection, { Props } from './EmailDetailsSection'
import { PitchStepEmailContextFragment } from '../../data/get-pitch-step-data'

jest.mock('@staff-portal/communication-send-email', () => ({
  ...jest.requireActual('@staff-portal/communication-send-email'),
  SendEmailModal: {
    SubjectField: () => <div data-testid='subject-field' />,
    ToField: () => <div data-testid='to-field' />,
    CCSuggestedField: () => <div data-testid='cc-suggested-field' />,
    CCAdditionalField: () => <div data-testid='cc-additional-field' />,
    CCExternalField: () => <div data-testid='cc-external-field' />
  }
}))

const arrangeTest = ({ emailContext, sender }: Props) => {
  render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <EmailDetailsSection emailContext={emailContext} sender={sender} />
      </Form>
    </TestWrapper>
  )
}

describe('EmailDetailsSection', () => {
  it('renders valid section title', () => {
    arrangeTest({
      sender: {
        id: '123',
        type: 'Designer',
        fullName: 'Timofei Kachalov',
        resumeUrl: '',
        webResource: {
          text: 'Timofei Kachalov'
        }
      },
      emailContext: {} as PitchStepEmailContextFragment['pitchEmailMessaging']
    })

    expect(
      screen.getByText(
        'Explain why this designer is an excellent fit for the job'
      )
    ).toBeInTheDocument()
  })

  describe('when `emailContext` is empty', () => {
    it('does not render component', () => {
      arrangeTest({
        sender: {
          id: '123',
          type: 'Designer',
          fullName: 'Timofei Kachalov',
          resumeUrl: '',
          webResource: {
            text: 'Timofei Kachalov'
          }
        },
        emailContext: null
      })

      expect(
        screen.queryByTestId('email-details-section')
      ).not.toBeInTheDocument()
    })
  })

  it('renders send email fields', () => {
    arrangeTest({
      sender: {
        id: '123',
        type: 'Designer',
        fullName: 'Timofei Kachalov',
        resumeUrl: '',
        webResource: {
          text: 'Timofei Kachalov'
        }
      },
      emailContext: {} as PitchStepEmailContextFragment['pitchEmailMessaging']
    })

    expect(screen.getByTestId('subject-field')).toBeInTheDocument()
    expect(screen.getByTestId('to-field')).toBeInTheDocument()
    expect(screen.getByTestId('cc-suggested-field')).toBeInTheDocument()
    expect(screen.getByTestId('cc-additional-field')).toBeInTheDocument()
    expect(screen.getByTestId('cc-external-field')).toBeInTheDocument()
  })
})
