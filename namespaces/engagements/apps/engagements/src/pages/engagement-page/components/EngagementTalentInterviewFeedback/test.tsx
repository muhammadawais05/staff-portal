import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { DetailedListSkeleton } from '@staff-portal/ui'

import EngagementTalentInterviewFeedback from '.'
import TalentInterviewFeedbackContent from './components/TalentInterviewFeedbackContent'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/DetailedListSkeleton', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('./components/TalentInterviewFeedbackContent', () => ({
  __esModule: true,
  default: jest.fn()
}))

const defaultProps = {
  engagementId: '11',
  labelColumnWidth: 10
}

const arrangeTest = (
  props?: ComponentProps<typeof EngagementTalentInterviewFeedback>
) => {
  const newProps = {
    ...defaultProps,
    ...props
  }

  return render(
    <TestWrapper>
      <EngagementTalentInterviewFeedback {...newProps} />
    </TestWrapper>
  )
}

const mockUseGetCode = useGetNode as jest.Mock

describe('EngagementTalentInterviewFeedback', () => {
  describe('when data is loading', () => {
    it('renders skeleton', () => {
      const DetailedListSkeletonMock = (
        DetailedListSkeleton as unknown as jest.Mock
      ).mockImplementation(() => null)

      mockUseGetCode.mockImplementation(() => () => ({
        data: undefined,
        loading: true,
        initialLoading: true
      }))

      arrangeTest()

      expect(DetailedListSkeletonMock).toHaveBeenCalledWith(
        expect.objectContaining({
          'data-testid': 'talent-interview-feedback-skeleton',
          items: 3,
          columns: 1,
          labelColumnWidth: defaultProps.labelColumnWidth
        }),
        {}
      )
    })
  })

  describe('when surveyAnswer is missing', () => {
    it('renders nothing', () => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: {
          id: '22',
          talent: {
            id: 22,
            resumeUrl: 'http://toptal.com/resume/22',
            webResource: {
              text: 'Full Name',
              url: 'http://toptal.com/staff/22'
            }
          }
        },
        loading: false,
        initialLoading: false
      }))

      arrangeTest()

      expect(
        screen.queryByTestId('TalentInterviewFeedbackContent')
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent is missing', () => {
    it('renders nothing', () => {
      mockUseGetCode.mockImplementation(() => () => ({
        data: {
          id: '22',
          talent: undefined,
          interview: {
            surveyAnswer: {
              rating: 2,
              comment: 'Comment',
              answeredAt: 'Jun 25, 2021 at 10:00 AM (UTC+03:00)'
            }
          }
        },
        loading: false,
        initialLoading: false
      }))

      arrangeTest()

      expect(
        screen.queryByTestId('TalentInterviewFeedbackContent')
      ).not.toBeInTheDocument()
    })
  })

  describe('renders proper content', () => {
    it('when talent and surveyAnswer are available', () => {
      const TalentInterviewFeedbackContentMock = (
        TalentInterviewFeedbackContent as jest.Mock
      ).mockImplementation(() => null)

      const mockData = {
        id: '22',
        talent: {
          id: 22,
          resumeUrl: 'http://toptal.com/resume/22',
          webResource: {
            text: 'Full Name',
            url: 'http://toptal.com/staff/22'
          }
        },
        interview: {
          surveyAnswer: {
            rating: 2,
            comment: 'Comment',
            answeredAt: 'Jun 25, 2021 at 10:00 AM (UTC+03:00)'
          }
        }
      }

      mockUseGetCode.mockImplementation(() => () => ({
        data: mockData,
        loading: false,
        initialLoading: false
      }))

      arrangeTest()
      expect(TalentInterviewFeedbackContentMock).toHaveBeenCalledWith(
        expect.objectContaining({
          labelColumnWidth: defaultProps.labelColumnWidth,
          surveyAnswer: mockData.interview.surveyAnswer,
          talent: mockData.talent
        }),
        {}
      )
    })
  })
})
