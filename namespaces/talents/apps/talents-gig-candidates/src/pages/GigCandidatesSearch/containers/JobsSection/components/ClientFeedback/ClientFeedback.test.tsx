import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import ClientFeedback, { Props } from './ClientFeedback'

const mockData = [
  {
    clientAnswers: {
      nodes: [
        {
          option: {
            question: {
              label: 'Hire again'
            },
            value: '10'
          },
          tooltip:
            'How likely are you to hire the developer again for a similar project?'
        },
        {
          option: {
            question: {
              label: 'Timeline adherence'
            },
            value: '5'
          },
          tooltip: 'Did the developer adhere to your timelines?'
        },
        {
          option: {
            question: {
              label: 'Communication'
            },
            value: '4'
          },
          tooltip:
            'Are you happy with the communication style of the developer?'
        },
        {
          option: {
            question: {
              label: 'Quality of work'
            },
            value: '3'
          },
          tooltip: 'Are you satisfied with the quality of the work delivered?'
        }
      ]
    }
  }
]

const arrangeTest = ({ clientFeedback = [] }: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <ClientFeedback clientFeedback={clientFeedback} />
    </TestWrapper>
  )

describe('Client Feedback', () => {
  it('shows message if no feedback is present', () => {
    arrangeTest()

    expect(screen.getByTestId('client-feedback')).toBeInTheDocument()
    expect(screen.getByText('Client Feedback')).toBeInTheDocument()
    expect(
      screen.getByText('There is no client feedback for this engagement.')
    ).toBeInTheDocument()
  })

  it('renders data if feedback is present', () => {
    arrangeTest({ clientFeedback: mockData })

    expect(screen.getByTestId('client-feedback')).toBeInTheDocument()
    expect(
      screen.queryByText('There is no client feedback for this engagement.')
    ).not.toBeInTheDocument()

    mockData[0].clientAnswers.nodes.forEach(
      ({ option: { question, value } }) => {
        expect(screen.getByText(question.label)).toBeInTheDocument()
        expect(screen.getByText(value)).toBeInTheDocument()
      }
    )
  })
})
