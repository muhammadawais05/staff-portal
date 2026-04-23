import React from 'react'
import { render } from '@testing-library/react'
import { SkeletonLoader } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import CommentsSkeleton from '.'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Typography: jest.fn()
  }
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <CommentsSkeleton />
    </TestWrapper>
  )

const SkeletonLoaderTypographyMock =
  SkeletonLoader.Typography as unknown as jest.Mock

describe('CommentsSkeleton', () => {
  it('renders 1 row', () => {
    SkeletonLoaderTypographyMock.mockImplementationOnce(() => null)

    renderComponent()

    expect(SkeletonLoaderTypographyMock).toHaveBeenCalledWith({ rows: 1 }, {})
  })
})
