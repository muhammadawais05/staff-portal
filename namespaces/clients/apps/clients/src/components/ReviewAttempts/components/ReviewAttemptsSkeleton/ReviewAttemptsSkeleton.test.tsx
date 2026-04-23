import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Section, SkeletonLoader } from '@toptal/picasso'

import ReviewAttemptsSkeleton from '.'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  SkeletonLoader: {
    Typography: jest.fn()
  },
  Section: jest.fn()
}))

const SectionMock = Section as unknown as jest.Mock
const TypographyMock = SkeletonLoader.Typography as unknown as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <ReviewAttemptsSkeleton />
    </TestWrapper>
  )

describe('ReviewAttemptsSkeleton', () => {
  beforeEach(() => {
    SectionMock.mockImplementation(({ children }) => <>{children}</>)
    TypographyMock.mockReturnValue(null)
  })

  it('renders section skeleton with two action buttons and one row', () => {
    renderComponent()

    expect(SectionMock).toHaveBeenCalledTimes(1)
    expect(SectionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Review Attempts',
        variant: 'withHeaderBar'
      }),
      {}
    )

    expect(TypographyMock).toHaveBeenCalledTimes(1)
    expect(TypographyMock).toHaveBeenCalledWith(
      {
        rows: 1
      },
      {}
    )
  })
})
