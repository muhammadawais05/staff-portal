import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import RequestDetailsModal from '../../RequestDetailsModal'
import RateChangeRequestAnswers from './RateChangeRequestAnswers'

const arrangeTest = (
  props: Pick<ComponentProps<typeof RequestDetailsModal>, 'answers'>
) => {
  render(
    <TestWrapper>
      <RateChangeRequestAnswers {...props} />
    </TestWrapper>
  )
}

describe('RateChangeRequestAnswers', () => {
  it('renders rate change request answers', () => {
    const answers = {
      nodes: [
        {
          answer: 'Yes',
          question: 'Do you like cheese ?',
          comment: 'Especially mozzarella'
        },
        {
          answer: 'No',
          question: 'Do you like motorsport ?'
        }
      ]
    }

    arrangeTest({
      answers
    })

    expect(
      screen.getByTestId('rate-change-request-answers')
    ).toBeInTheDocument()
    expect(screen.getByText('Talent Answers')).toBeInTheDocument()
    expect(screen.getByText('Do you like cheese ?')).toBeInTheDocument()
    expect(screen.getByText('Yes. Especially mozzarella')).toBeInTheDocument()
    expect(screen.getByText('Do you like motorsport ?')).toBeInTheDocument()
    expect(screen.getByText('No')).toBeInTheDocument()
  })

  describe('when "answers" is empty', () => {
    it('does not render rate change request answers', () => {
      arrangeTest({
        answers: {
          nodes: []
        }
      })

      expect(
        screen.queryByTestId('rate-change-request-answers')
      ).not.toBeInTheDocument()
    })
  })
})
