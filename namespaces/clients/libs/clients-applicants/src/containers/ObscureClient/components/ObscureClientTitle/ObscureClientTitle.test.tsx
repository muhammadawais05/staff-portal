import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ClientFragment } from '@staff-portal/clients'

import ObscureClientTitle from './ObscureClientTitle'

const arrangeTest = (hasPendingCallbackRequest = false) =>
  render(
    <TestWrapper>
      <ObscureClientTitle
        company={
          {
            pendingCallbackRequest: hasPendingCallbackRequest ? {} : undefined
          } as ClientFragment
        }
      />
    </TestWrapper>
  )

describe('ObscureClientTitle', () => {
  it('renders Hidden', () => {
    arrangeTest()

    expect(screen.getByText('Hidden')).toBeInTheDocument()
    expect(screen.queryByText('(Pending Call Request)')).not.toBeInTheDocument()
  })

  it('renders Hidden (Pending Call Request)', () => {
    arrangeTest(true)

    expect(screen.getByText('Hidden')).toBeInTheDocument()
    expect(screen.getByText('(Pending Call Request)')).toBeInTheDocument()
  })
})
