import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'

import Legal from './Legal'

jest.mock('@staff-portal/ofac-compliance', () => ({
  OFACComplianceSection: (props: { nodeId: string }) => (
    <div data-testid='OFACComplianceSection'>
      <div data-testid='OFACComplianceSection-nodeId'>{props.nodeId}</div>
    </div>
  )
}))
jest.mock('@staff-portal/billing-widgets', () => ({
  StaffBillingDetailsAddressWidget: (props: { companyId: string }) => (
    <div data-testid='BillingDetailsAddressWidget'>
      <div data-testid='BillingDetailsAddressWidget-companyId'>
        {props.companyId}
      </div>
    </div>
  )
}))
jest.mock('../ContractsSection', () => ({
  __esModule: true,
  default: (props: { companyId: string }) => (
    <div data-testid='ContractsSection'>
      <div data-testid='ContractsSection-companyId'>{props.companyId}</div>
    </div>
  )
}))
jest.mock('../PublicAgreementsSection', () => ({
  __esModule: true,
  default: (props: { companyId: string }) => (
    <div data-testid='PublicAgreementsSection'>{props.companyId}</div>
  )
}))
jest.mock('@staff-portal/error-handling')

const arrangeTest = (props: ComponentProps<typeof Legal>) =>
  render(<Legal {...props} />)

const companyId = '123'

describe('Legal', () => {
  it('renders ContractsSection', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(getByTestId('ContractsSection')).toBeInTheDocument()
    expect(getByTestId('ContractsSection-companyId')).toHaveTextContent(
      companyId
    )
  })

  it('renders PublicAgreementsSection', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(getByTestId('PublicAgreementsSection')).toBeInTheDocument()
    expect(getByTestId('PublicAgreementsSection')).toHaveTextContent(companyId)
  })

  it('renders OFAC Components', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(getByTestId('OFACComplianceSection')).toBeInTheDocument()
    expect(getByTestId('OFACComplianceSection-nodeId')).toHaveTextContent(
      companyId
    )
  })

  it('renders Billing Components', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(
      getByTestId('BillingDetailsAddressWidget-companyId')
    ).toHaveTextContent(companyId)
  })
})
