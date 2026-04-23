import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { ApolloError, useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import { OpportunityTimelineSection } from '.'
import { opportunityTimelineFragmentMock } from './data/opportunity-timeline-fragment.mock'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/ui/src/components/Skeleton/TableSkeleton')
jest.mock('@staff-portal/ui/src/components/ContainerLoader')

jest.mock('./components/OpportunityTimelineContent', () => () => (
  <div data-testid='OpportunityTimelineContent'></div>
))

const mockedUseGetNode = useGetNode as jest.Mock

const renderComponent = ({
  data,
  loading = false,
  initialLoading = false,
  error
}: {
  data?: object
  loading?: boolean
  initialLoading?: boolean
  error?: ApolloError | undefined
}) => {
  mockedUseGetNode.mockImplementation(() => () => ({
    data,
    loading,
    initialLoading,
    error
  }))

  return render(
    <TestWrapper>
      <OpportunityTimelineSection opportunityId='1' />
    </TestWrapper>
  )
}

describe('OpportunityTimelineSection', () => {
  describe('when data is loaded', () => {
    it('renders internal team', () => {
      renderComponent({
        data: opportunityTimelineFragmentMock
      })

      expect(
        screen.getByTestId('OpportunityTimelineContent')
      ).toBeInTheDocument()
    })
  })
})
