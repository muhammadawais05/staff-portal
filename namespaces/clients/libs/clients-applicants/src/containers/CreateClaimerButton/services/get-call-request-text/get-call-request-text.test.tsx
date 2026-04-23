import { CallRequestType } from '@staff-portal/clients-call-requests'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { getCallRequestText } from './get-call-request-text'

const arrangeTest = (
  type?: string | null,
  scheduledAt?: string | null,
  timeZoneName?: string
) =>
  render(
    <p data-testid='test'>
      {getCallRequestText(type, scheduledAt, timeZoneName)}
    </p>
  )

describe('getCallRequestText', () => {
  it('should return instant text', () => {
    arrangeTest(CallRequestType.INSTANT)

    expect(screen.getByTestId('test')).toHaveTextContent(
      'The company has an instant callback request.'
    )
  })

  it('should return scheduled text', () => {
    arrangeTest(CallRequestType.SCHEDULED, 'May, 10', 'MSK')

    expect(screen.getByTestId('test')).toHaveTextContent(
      'The company has a callback request scheduled for May, 10 MSK'
    )
  })
})
