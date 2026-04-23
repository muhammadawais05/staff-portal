import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import {
  InterviewRatingFacetValues,
  InterviewStatus
} from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  EngagementClientInterviewFeedbackFragment,
  GetEngagementClientInterviewFeedbackQuery
} from './data/get-engagement-client-interview-feedback/get-engagement-client-interview-feedback.staff.gql.types'
import EngagementClientInterviewFeedback from './EngagementClientInterviewFeedback'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const mockReturnValues = ({
  loading = false,
  initialLoading = false,
  data
}: Partial<{
  loading?: boolean
  initialLoading?: boolean
  data?: GetEngagementClientInterviewFeedbackQuery['node']
}> = {}) => {
  const useGetNodeMocked = useGetNode as jest.Mock

  useGetNodeMocked.mockImplementation(() => () => ({
    loading,
    initialLoading,
    data
  }))
}

const renderComponent = () =>
  render(
    <TestWrapper>
      <EngagementClientInterviewFeedback engagementId='1' />
    </TestWrapper>
  )

describe('EngagementClientInterviewFeedback', () => {
  it('renders the skeleton loader', () => {
    mockReturnValues({ initialLoading: true, data: undefined })
    renderComponent()

    expect(
      screen.getByTestId('client-interview-feedback-skeleton-loader')
    ).toBeInTheDocument()
  })

  it('renders nothing when there is no interview rating', () => {
    mockReturnValues({
      loading: false,
      data: {
        interview: {
          rating: null
        } as EngagementClientInterviewFeedbackFragment
      } as GetEngagementClientInterviewFeedbackQuery['node']
    })
    renderComponent()

    expect(
      screen.queryByTestId('client-interview-feedback-skeleton-loader')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByTestId('engagement-client-interview-feedback-section')
    ).not.toBeInTheDocument()
  })

  it('renders the fields correctly', () => {
    const CLIENT_LINK = {
      url: 'https://some.url',
      text: 'test client name'
    }
    const RATE_COMMENT = 'test rating comment'
    const RATING_FACETS = [
      { name: 'experience', value: InterviewRatingFacetValues.THUMBS_DOWN },
      { name: 'communication', value: InterviewRatingFacetValues.THUMBS_UP },
      { name: 'professionalism', value: InterviewRatingFacetValues.UNKNOWN }
    ]
    const FEEDBACK_COMMENT = 'test feedback comment'
    const ANSWER_OPTION_VALUE = 'test answer option'
    const TEST_REJECTED_COMMENT = 'test rejected comment'

    mockReturnValues({
      loading: false,
      data: {
        id: '1',
        client: {
          id: '1',
          webResource: CLIENT_LINK
        },
        interview: {
          id: '1',
          status: InterviewStatus.TIME_REJECTED,
          rating: 4,
          ratingComment: RATE_COMMENT,
          ratingFacets: RATING_FACETS,
          notReadyFeedback: {
            comment: FEEDBACK_COMMENT,
            answers: {
              nodes: [
                {
                  id: '1',
                  option: {
                    id: '1',
                    value: ANSWER_OPTION_VALUE
                  }
                }
              ]
            }
          },
          timeRejectComment: TEST_REJECTED_COMMENT
        } as EngagementClientInterviewFeedbackFragment
      } as GetEngagementClientInterviewFeedbackQuery['node']
    })
    renderComponent()

    expect(screen.getByTestId('interview-submitter-link')).toHaveAttribute(
      'href',
      CLIENT_LINK.url
    )
    expect(screen.getByText(RATE_COMMENT)).toBeInTheDocument()

    RATING_FACETS.forEach(({ name }) => {
      expect(screen.getByText(name, { exact: false })).toBeInTheDocument()
    })

    expect(screen.getByText(`"${FEEDBACK_COMMENT}"`)).toBeInTheDocument()
    expect(screen.getByText(ANSWER_OPTION_VALUE)).toBeInTheDocument()
    expect(screen.getByText(`"${TEST_REJECTED_COMMENT}"`)).toBeInTheDocument()
  })

  it('hides feedback and rejected comment field', () => {
    mockReturnValues({
      loading: false,
      data: {
        id: '1',
        interview: {
          id: '1',
          status: InterviewStatus.ACCEPTED,
          rating: 4,
          ratingFacets: [],
          notReadyFeedback: null,
          timeRejectComment: ''
        } as EngagementClientInterviewFeedbackFragment
      } as GetEngagementClientInterviewFeedbackQuery['node']
    })
    renderComponent()

    expect(
      screen.getByTestId('engagement-client-interview-feedback-section')
    ).toBeInTheDocument()
    expect(screen.queryByText('Feedback')).not.toBeInTheDocument()
    expect(screen.queryByText('Rejection Comment')).not.toBeInTheDocument()
  })
})
