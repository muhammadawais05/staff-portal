import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import EmailPreviewContent from './EmailPreviewContent'

jest.mock('../EmailPreviewContentLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='email-preview-content-loader' />
}))

const arrangeTest = (preview?: string, loading = false) =>
  render(
    <TestWrapper>
      <EmailPreviewContent loading={loading} preview={preview} />
    </TestWrapper>
  )

describe('EmailPreviewContent', () => {
  it('shows the loader', () => {
    arrangeTest(undefined, true)

    expect(
      screen.getByTestId('email-preview-content-loader')
    ).toBeInTheDocument()
  })

  it('shows the email preview', () => {
    const PREVIEW = 'test email preview'

    arrangeTest(PREVIEW)

    expect(screen.getByText(PREVIEW)).toBeInTheDocument()
    expect(
      screen.queryByTestId('email-preview-content-loader')
    ).not.toBeInTheDocument()
  })
})
