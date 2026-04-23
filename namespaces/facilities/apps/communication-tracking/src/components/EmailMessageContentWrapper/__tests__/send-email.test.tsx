import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from '@staff-portal/navigation'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EmailMessageContentWrapper, {
  Props
} from '../EmailMessageContentWrapper'

const SEND_EMAIL_BUTTON_TEXT = /Send email/i

const arrangeTest = ({ props }: { props: Props }) =>
  render(
    <MemoryRouter>
      <TestWrapperWithMocks>
        <EmailMessageContentWrapper {...props}>
          {null}
        </EmailMessageContentWrapper>
      </TestWrapperWithMocks>
    </MemoryRouter>
  )

describe('EmailMessageContentWrapper "Send Email" button', () => {
  it('should be shown when in role or client context', async () => {
    arrangeTest({
      props: {
        entityType: 'talents',
        entityId: 'TEST_ID'
      }
    })

    expect(screen.getByText(SEND_EMAIL_BUTTON_TEXT)).toBeInTheDocument()

    // Wait for StatusMessages and AuthorizeGmailNotification components updates
    await waitFor(() => {})
  })

  it('should be hidden when NOT in role or client context', async () => {
    arrangeTest({ props: {} })

    expect(screen.queryByText(SEND_EMAIL_BUTTON_TEXT)).not.toBeInTheDocument()

    // Wait for StatusMessages and AuthorizeGmailNotification components updates
    await waitFor(() => {})
  })
})
