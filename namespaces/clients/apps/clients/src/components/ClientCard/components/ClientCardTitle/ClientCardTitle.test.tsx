import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ClientFragment } from '@staff-portal/clients'

import { ClientCardTitle } from './ClientCardTitle'

const COMPANY_NAME = 'Company Name'

const renderComponent = (hasPendingCallbackRequest = false) =>
  render(
    <TestWrapper>
      <ClientCardTitle
        client={
          {
            id: 'VjEtQ2xpZW50LTYyMjU5OA',
            fullName: COMPANY_NAME,
            webResource: { url: undefined },
            pendingCallbackRequest: hasPendingCallbackRequest ? {} : undefined
          } as ClientFragment
        }
      />
    </TestWrapper>
  )

describe('CompanyApplicantTitle', () => {
  it('renders company name', () => {
    renderComponent()

    expect(screen.getByText(COMPANY_NAME)).toBeInTheDocument()
    expect(screen.queryByText('(Pending Call Request)')).not.toBeInTheDocument()
  })

  it('renders company name with pending call request flag', () => {
    renderComponent(true)

    expect(screen.getByText(COMPANY_NAME)).toBeInTheDocument()
    expect(screen.getByText('(Pending Call Request)')).toBeInTheDocument()
  })
})
