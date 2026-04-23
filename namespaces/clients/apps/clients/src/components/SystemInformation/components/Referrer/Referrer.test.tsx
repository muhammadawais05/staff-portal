import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import Referrer from '.'
import { systemInformationDataMock } from '../../data/system-information-fragment.mock'

const arrangeTest = (props: ComponentProps<typeof Referrer>) =>
  render(
    <TestWrapper>
      <Referrer {...props} />
    </TestWrapper>
  )

describe('Referrer', () => {
  it('default render', () => {
    arrangeTest({
      referrer: systemInformationDataMock.referrer
    })

    const reviewLink = screen.getByTestId('Referrer-link')

    expect(reviewLink).toHaveTextContent(
      systemInformationDataMock.referrer.webResource.text
    )
    expect(reviewLink).toHaveAttribute(
      'href',
      systemInformationDataMock.referrer.webResource.url
    )
  })
})
