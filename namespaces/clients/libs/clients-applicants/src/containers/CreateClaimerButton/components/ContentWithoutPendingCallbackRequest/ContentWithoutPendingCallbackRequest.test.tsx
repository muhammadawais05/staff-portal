import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ContentWithoutPendingCallbackRequest from './ContentWithoutPendingCallbackRequest'

const renderComponent = (
  props: ComponentProps<typeof ContentWithoutPendingCallbackRequest>
) =>
  render(
    <TestWrapper>
      <ContentWithoutPendingCallbackRequest {...props} />
    </TestWrapper>
  )

describe('ContentWithoutPendingCallbackRequest', () => {
  it('default render', () => {
    const question = 'question'

    renderComponent({ question })

    expect(
      screen.getByTestId('content-without-pending-callback-request-question')
        .textContent
    ).toBe(question)
    expect(
      screen.getByTestId('content-without-pending-callback-request-message')
        .textContent
    ).toBe('You will be responsible for their application.')
  })
})
