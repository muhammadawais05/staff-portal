import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import NPSScore from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof NPSScore>) =>
  render(
    <TestWrapper>
      <NPSScore {...props} />
    </TestWrapper>
  )

describe('NPSScore', () => {
  it('default render', () => {
    arrangeTest({
      lastAnsweredPromotion: systemInformationDataMock.lastAnsweredPromotion,
      promotions: systemInformationDataMock.promotions,
      timeZone: 'Europe/London'
    })

    const reviewLink = screen.getByTestId('NPSScore-link')

    expect(reviewLink).toHaveTextContent('10 (Sep 26, 2016)')
    expect(reviewLink).toHaveAttribute(
      'href',
      systemInformationDataMock.promotions.webResource.url
    )
  })
})
