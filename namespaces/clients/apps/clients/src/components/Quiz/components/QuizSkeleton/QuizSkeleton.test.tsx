import React from 'react'
import { render } from '@testing-library/react'
import { SkeletonLoader } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import QuizSkeleton from '.'

jest.mock('../QuizSection')
jest.mock('@toptal/picasso', () => ({
  SkeletonLoader: {
    Typography: jest.fn()
  }
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <QuizSkeleton />
    </TestWrapper>
  )

const SkeletonLoaderTypographyMock =
  SkeletonLoader.Typography as unknown as jest.Mock

describe('QuizSkeleton', () => {
  it('renders 1 row', () => {
    SkeletonLoaderTypographyMock.mockImplementationOnce(() => null)

    arrangeTest()

    expect(SkeletonLoaderTypographyMock).toHaveBeenCalledWith({ rows: 1 }, {})
  })
})
