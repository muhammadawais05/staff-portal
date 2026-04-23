import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ReviewAttempts from './ReviewAttempts'
import { ReviewAttemptsContent } from './components'

jest.mock('@staff-portal/data-layer-service')
jest.mock('./components', () => ({
  ReviewAttemptsContent: jest.fn(),
  ReviewAttemptsSkeleton: jest.fn().mockImplementationOnce(() => null)
}))

const renderComponent = (props: ComponentProps<typeof ReviewAttempts>) =>
  render(
    <TestWrapper>
      <ReviewAttempts {...props} />
    </TestWrapper>
  )

describe('ReviewAttempts', () => {
  describe('when all necessary data to display a section is returned', () => {
    it('renders section', () => {
      const mockUseGetCode = useGetNode as jest.Mock
      const mockReviewAttemptsContent = ReviewAttemptsContent as jest.Mock
      const mockedReviewAttemptsContent = jest.fn(() => null)

      mockReviewAttemptsContent.mockImplementationOnce(
        mockedReviewAttemptsContent
      )
      mockUseGetCode.mockReturnValueOnce(() => ({
        data: {
          reviewAttempts: {
            nodes: ['test']
          }
        },
        loading: false,
        fetchMore: jest.fn(),
        initialLoading: false
      }))

      renderComponent({ clientId: 'companyId' })

      expect(mockedReviewAttemptsContent).toHaveBeenCalledTimes(1)
      expect(mockedReviewAttemptsContent).toHaveBeenCalledWith(
        {
          clientId: 'companyId',
          reviewAttempts: ['test']
        },
        {}
      )
    })
  })
})
