import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  createRateChangeRequestMock,
  createActiveEngagementMock
} from '../../../../data/rate-change-request-fragment/mocks'
import RequestDetailsModal from '../../RequestDetailsModal'
import RequestDetailsModalContent from './RequestDetailsModalContent'

const arrangeTest = (
  props: Omit<ComponentProps<typeof RequestDetailsModal>, 'hideModal'>
) => {
  render(
    <TestWrapper>
      <RequestDetailsModalContent {...props} />
    </TestWrapper>
  )
}

describe('RequestDetailsModalContent', () => {
  it('renders request details content fields', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      engagement: createActiveEngagementMock(),
      answers: {
        nodes: []
      }
    })

    arrangeTest({
      ...rateChangeRequest
    })

    expect(screen.getByText('General Info')).toBeInTheDocument()
    expect(screen.getByText('Alex Mason')).toBeInTheDocument()
    expect(screen.getByText('Domenic Koss')).toBeInTheDocument()
    expect(screen.getByTestId('talent-email-link')).toHaveAttribute(
      'href',
      'mailto:domenic.koss@toptal.net'
    )
    expect(screen.getByText('domenic.koss@toptal.net')).toBeInTheDocument()
    expect(screen.getByText('Colombia')).toBeInTheDocument()
    expect(screen.getByText('My client')).toBeInTheDocument()
    expect(screen.getByText('Full-time')).toBeInTheDocument()
    expect(screen.getByText('$100.0/hour')).toBeInTheDocument()
    expect(screen.getByText('$50.0/hour')).toBeInTheDocument()
    expect(screen.getByText('$299.00/hour')).toBeInTheDocument()
    expect(screen.getByText('22')).toBeInTheDocument()
    expect(screen.getByText('Engagement 1')).toBeInTheDocument()
    expect(screen.getByText('Nov 30, 2021')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(
      screen.queryByTestId('rate-change-request-answers')
    ).not.toBeInTheDocument()
  })

  describe('when only "RelationshipManager" exist', () => {
    it('renders request details with "RelationShipManager" full name', () => {
      const rateChangeRequest = createRateChangeRequestMock({
        engagement: createActiveEngagementMock({
          job: {
            client: {
              fullName: 'Task Force 141',
              accountManager: null,
              relationshipManager: {
                fullName: 'David Mason'
              },
              webResource: {
                text: 'My client',
                url: 'https://staging.toptal.net/platform/staff/companies/1'
              }
            }
          }
        }),
        answers: {
          nodes: []
        }
      })

      arrangeTest({
        ...rateChangeRequest
      })

      expect(screen.getByText('David Mason')).toBeInTheDocument()
    })
  })

  describe('when "answers" is included', () => {
    it('renders request details content fields with answers', () => {
      const answers = {
        nodes: [
          {
            answer: 'Yes',
            question: 'Do you like cheese ?',
            comment: 'Especially mozzarella'
          }
        ]
      }
      const rateChangeRequest = createRateChangeRequestMock({
        engagement: createActiveEngagementMock(),
        answers
      })

      arrangeTest({
        ...rateChangeRequest
      })

      expect(
        screen.getByTestId('rate-change-request-answers')
      ).toBeInTheDocument()
    })
  })
})
