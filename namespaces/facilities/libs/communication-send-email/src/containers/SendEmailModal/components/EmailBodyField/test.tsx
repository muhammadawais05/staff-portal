import { render, screen } from '@toptal/picasso/test-utils'
import React, { FC } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { Props as EmailPreviewProps } from '../EmailPreview'
import EmailBodyField from './EmailBodyField'

jest.mock('../RoleEmailPreview', () => ({
  __esModule: true,
  default: () => <div data-testid='role-email-preview' />
}))

jest.mock('../../context/send-email-context', () => ({
  __esModule: true,
  useSendEmailContext: () => ({
    isBodyPreview: true,
    setIsBodyPreview: jest.fn()
  })
}))

jest.mock('@toptal/picasso-forms', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso-forms'),
  useField: () => ({
    input: {
      values: 'test'
    }
  })
}))

const arrangeTest = (emailPreview?: FC<EmailPreviewProps>) =>
  render(
    <TestWrapper>
      <EmailBodyField emailPreview={emailPreview} />
    </TestWrapper>
  )

describe('EmailBodyField', () => {
  it('renders the default email preview', () => {
    arrangeTest()

    expect(screen.getByTestId('role-email-preview')).toBeInTheDocument()
  })

  it('renders the custom email preview', () => {
    const CUSTOM_PREVIEW_COMPONENT = () => (
      <div data-testid='custom-email-preview' />
    )

    arrangeTest(CUSTOM_PREVIEW_COMPONENT)

    expect(screen.queryByTestId('role-email-preview')).not.toBeInTheDocument()
    expect(screen.getByTestId('custom-email-preview')).toBeInTheDocument()
  })
})
