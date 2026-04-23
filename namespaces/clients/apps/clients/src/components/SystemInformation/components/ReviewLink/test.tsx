import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import ReviewLink from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof ReviewLink>) =>
  render(
    <TestWrapper>
      <ReviewLink {...props} />
    </TestWrapper>
  )

describe('ReviewLink', () => {
  it('default render', () => {
    arrangeTest({
      reviewLink: systemInformationDataMock.reviewLink,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientReviewLink: jest.fn()
    })

    const reviewLink = screen.getByTestId('ReviewLink-link')

    expect(reviewLink).toHaveTextContent(systemInformationDataMock.reviewLink)
    expect(reviewLink).toHaveAttribute(
      'href',
      systemInformationDataMock.reviewLink
    )
  })

  it('displays placeholder', () => {
    arrangeTest({
      reviewLink: undefined,
      handleChange: jest.fn(),
      operationDisabled: false,
      useClientReviewLink: jest.fn()
    })

    expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
  })
})
