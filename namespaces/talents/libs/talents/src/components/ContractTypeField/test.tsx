import React, { ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { ContractKind } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import ContractTypeField from './ContractTypeField'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: ({
    content,
    children
  }: {
    content: ReactNode
    children: ReactNode
  }) => (
    <div data-testid='Tooltip'>
      <div data-testid='Tooltip-content'>{content}</div>
      <div>{children}</div>
    </div>
  )
}))

const arrangeTest = (kind: ContractKind, tooltip?: string) =>
  render(
    <TestWrapper>
      <ContractTypeField kind={kind} tooltip={tooltip} />
    </TestWrapper>
  )

describe('ContractTypeField', () => {
  it('renders tooltip content', () => {
    arrangeTest(ContractKind.CLIENT_SERVICES_AGREEMENT, 'some content')

    expect(screen.queryByTestId('Tooltip-content')).toHaveTextContent(
      'some content'
    )
  })

  it.each([
    [ContractKind.CLIENT_SERVICES_AGREEMENT, 'Client Services Agreement'],
    [ContractKind.ENGAGEMENT_LETTER, 'Engagement Letter'],
    [ContractKind.STA, 'STA'],
    [ContractKind.TALENT_AGREEMENT, 'Talent Agreement'],
    [ContractKind.TAX_FORM, 'Tax Form'],
    [ContractKind.TOP, 'TOP']
  ])('renders "%s" type', (kind, label) => {
    arrangeTest(kind)

    expect(screen.queryByText(label)).toBeInTheDocument()
  })
})
