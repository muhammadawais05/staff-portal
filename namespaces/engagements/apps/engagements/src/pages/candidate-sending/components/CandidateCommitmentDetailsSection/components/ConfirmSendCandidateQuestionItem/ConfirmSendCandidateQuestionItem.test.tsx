import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import {
  CommitmentAvailability,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import ConfirmSendCandidateQuestionItem, {
  Props
} from './ConfirmSendCandidateQuestionItem'
import { PreviousTalentEngagementForClientFragment } from '../../../../data/get-availability-step-data'

const renderComponent = ({
  previousTalentEngagementForClient,
  talentFullName,
  talentProfileLink
}: Props) => {
  return render(
    <TestWrapper>
      <Form onSubmit={() => {}}>
        <ConfirmSendCandidateQuestionItem
          previousTalentEngagementForClient={previousTalentEngagementForClient}
          talentFullName={talentFullName}
          talentProfileLink={talentProfileLink}
        />
      </Form>
    </TestWrapper>
  )
}

describe('ConfirmSendCandidateQuestionItem', () => {
  const questionText =
    'Client and Timofei Kachalov worked together for the hourly job titled Job Name at the rate of $15.00/hour for client and $10.00/hour for talent. ' +
    'Are you sure you want to send this candidate to the client?'
  const checkboxText = 'Yes, I want to send this candidate to the client.'

  const baseProps: Props = {
    previousTalentEngagementForClient: {
      id: '123',
      currentCommitment: {
        availability: CommitmentAvailability.hourly,
        adjustedCompanyRate: {
          value: 15
        },
        adjustedTalentRate: {
          value: 10
        }
      },
      job: {
        id: '123',
        webResource: {
          text: 'Job Name',
          url: ''
        }
      },
      status: EngagementStatus.ACTIVE
    } as unknown as PreviousTalentEngagementForClientFragment,
    talentFullName: 'Timofei Kachalov',
    talentProfileLink:
      'https://staging.toptal.net/platform/staff/talents/3037748'
  }

  describe('when previous engagement is set', () => {
    it('renders the component', () => {
      renderComponent(baseProps)

      expect(
        screen.getAllByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )[0]
      ).toBeInTheDocument()
      expect(screen.getByText(checkboxText)).toBeInTheDocument()
    })
  })

  describe('when previous engagement does not exist', () => {
    it('does not render the component', () => {
      renderComponent({
        ...baseProps,
        previousTalentEngagementForClient: null
      })

      expect(
        screen.queryByText(
          (_, element) => element?.textContent?.includes(questionText) ?? false
        )
      ).not.toBeInTheDocument()
      expect(screen.queryByText(checkboxText)).not.toBeInTheDocument()
    })
  })
})
