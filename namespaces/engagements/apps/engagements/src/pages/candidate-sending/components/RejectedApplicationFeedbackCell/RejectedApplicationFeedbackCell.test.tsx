import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'

import RejectedApplicationFeedbackCell from './RejectedApplicationFeedbackCell'
import { useCandidateSendingContext } from '../../hooks'
import { SubmitNewEngagementWizardPayloadFragment } from '../../data/submit-new-engagement-wizard'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: ({
    content,
    children
  }: {
    content: ReactNode
    children: ReactNode
  }) => (
    <div data-testid='tooltip'>
      <div data-testid='tooltip-content'>{content}</div>
      <div>{children}</div>
    </div>
  )
}))

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = ({
  id,
  newEngagementWizardMutationPayload
}: {
  id: string
  newEngagementWizardMutationPayload: SubmitNewEngagementWizardPayloadFragment
}) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    newEngagementWizardMutationPayload
  }))

  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <table>
          <tbody>
            <tr>
              <RejectedApplicationFeedbackCell id={id} />
            </tr>
          </tbody>
        </table>
      </Form>
    </TestWrapper>
  )
}

describe('RejectedApplicationFeedbackCell', () => {
  it('renders component', () => {
    const id = '123'

    renderComponent({
      id,
      newEngagementWizardMutationPayload: {
        engagement: {
          talent: { fullName: 'Norberto Becker' }
        },
        rejectionFeedback: {
          internalFeedbackTitleAndSlugs: [
            {
              key: 'missing_valuable_skills',
              value: 'Missing valuable skills'
            }
          ],
          internalFeedbackTooltips: [
            {
              key: 'missing_valuable_skills',
              value: 'some value'
            }
          ]
        }
      } as SubmitNewEngagementWizardPayloadFragment
    })

    expect(
      screen.getByText('Feedback to share with talent:')
    ).toBeInTheDocument()
    expect(screen.getByText('Internal feedback:')).toBeInTheDocument()
    expect(
      screen.getByTestId(`rejected-application-feedback-cell-feedback-${id}`)
    ).toBeInTheDocument()
    expect(screen.getByText('Missing valuable skills')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip')).toBeInTheDocument()
    expect(screen.getByTestId('tooltip-content')).toHaveTextContent(
      'some value'
    )
  })
})
