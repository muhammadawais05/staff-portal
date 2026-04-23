import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@testing-library/react'

import RejectedApplicationItem, { Props } from './RejectedApplicationItem'
import { useCandidateSendingContext } from '../../hooks'

jest.mock(
  '../RejectedApplicationFeedbackCell/RejectedApplicationFeedbackCell',
  () => ({
    __esModule: true,
    default: () => <td data-testid='rejected-application-feedback-cell' />
  })
)

jest.mock('../../hooks', () => ({
  useCandidateSendingContext: jest.fn()
}))

const useCandidateSendingContextMock = useCandidateSendingContext as jest.Mock

const renderComponent = (props: Props) => {
  useCandidateSendingContextMock.mockImplementation(() => ({
    stepsAttributes: {}
  }))

  return render(
    <TestWrapper>
      <table>
        <tbody>
          <RejectedApplicationItem {...props} />
        </tbody>
      </table>
    </TestWrapper>
  )
}

describe('RejectedApplicationItem', () => {
  describe('when talent comes from job application', () => {
    it('renders component', () => {
      renderComponent({
        id: 'id-1',
        jobApplicationTalent: {
          profileLink: {
            text: 'Carma Keebler',
            url: 'https://some.url'
          }
        }
      } as Props)

      expect(screen.getByText('Carma Keebler')).toBeInTheDocument()
      expect(
        screen.getByTestId('rejected-application-feedback-cell')
      ).toBeInTheDocument()
      expect(screen.getByText('Show Info')).toBeInTheDocument()
    })
  })

  describe('when talent comes from availability request', () => {
    it('renders component', () => {
      renderComponent({
        id: 'id-1',
        availabilityRequestTalent: {
          profileLink: {
            text: 'Carma Keebler',
            url: 'https://some.url'
          }
        }
      } as Props)

      expect(screen.getByText('Carma Keebler')).toBeInTheDocument()
      expect(
        screen.getByTestId('rejected-application-feedback-cell')
      ).toBeInTheDocument()
      expect(screen.getByText('Show Info')).toBeInTheDocument()
    })
  })
})
