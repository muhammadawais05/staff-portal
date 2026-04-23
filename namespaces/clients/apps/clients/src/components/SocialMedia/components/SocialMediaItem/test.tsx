import React, { ComponentProps } from 'react'
import { render, screen, within } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import socialMediaCompanyDetails from '../../data/client-social-media-fragment.mock'
import SocialMediaItem from '.'

jest.mock('@staff-portal/ui/src/components/TypographyOverflowLink')

const arrangeTest = (props: ComponentProps<typeof SocialMediaItem>) =>
  render(
    <TestWrapper>
      <SocialMediaItem {...props} />
    </TestWrapper>
  )

describe('SocialMediaItem', () => {
  it('displays detailed list item editor properly', () => {
    const { getByTestId } = arrangeTest({
      name: 'twitter',
      initialValues: {},
      handleOnChange: jest.fn(),
      queryValue: jest.fn(),
      webResource: socialMediaCompanyDetails.twitterLink,
      value: 'awesome',
      disabled: true
    })

    expect(getByTestId('EditableField-twitter-value')).toHaveTextContent(
      'awesome'
    )
    expect(getByTestId('EditableField-twitter-viewer')).toHaveTextContent(
      'awesome'
    )
    expect(getByTestId('EditableField-twitter-name')).toHaveTextContent(
      'twitter'
    )
    expect(getByTestId('EditableField-twitter-disabled')).toHaveTextContent(
      'true'
    )
  })

  it('truncates overflowing content', () => {
    arrangeTest({
      name: 'twitter',
      initialValues: {},
      handleOnChange: jest.fn(),
      queryValue: jest.fn(),
      webResource: socialMediaCompanyDetails.twitterLink,
      value: 'awesome',
      disabled: true
    })

    expect(
      within(screen.getByTestId('EditableField-twitter-viewer')).getByTestId(
        'TypographyOverflow'
      )
    ).toBeInTheDocument()
  })
})
