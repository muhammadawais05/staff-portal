import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ClientFragment } from '@staff-portal/clients'

import { ClientCard } from './ClientCard'

jest.mock('./components/ClientCardTitle', () => ({
  __esModule: true,
  ClientCardTitle: () => <div data-testid='company-applicant-header' />
}))

jest.mock('./components/ClientCardActions', () => ({
  __esModule: true,
  ClientCardActions: () => null
}))

jest.mock('./components/ClientCardContent', () => ({
  __esModule: true,
  ClientCardContent: () => <div data-testid='company-applicant-content' />
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ClientCard client={{} as ClientFragment} type='applicant' />
    </TestWrapper>
  )

describe('CompanyApplicantsItem', () => {
  it('renders company name and content', () => {
    arrangeTest()

    expect(screen.getByTestId('company-applicant-header')).toBeInTheDocument()
    expect(screen.getByTestId('company-applicant-content')).toBeInTheDocument()
  })
})
