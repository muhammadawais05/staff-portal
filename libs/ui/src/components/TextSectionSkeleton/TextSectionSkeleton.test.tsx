import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import TextSectionSkeleton from './TextSectionSkeleton'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TextSectionSkeleton />
    </TestWrapper>
  )

describe('TextSectionSkeleton', () => {
  it('renders default', () => {
    arrangeTest()

    expect(screen.getByTestId('text-section-skeleton')).toBeInTheDocument()
  })
})
