import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import {
  StaffBasicBillingInfoWidget,
  StaffBillingDetailsWidget,
  StaffBillingInformationNotesWidget,
  StaffCommissionWidget,
  StaffConsolidationDefaultsWidget
} from '@staff-portal/billing-widgets'

import Billing from './Billing'

jest.mock('@staff-portal/billing-widgets', () => ({
  StaffBasicBillingInfoWidget: (
    props: ComponentProps<typeof StaffBasicBillingInfoWidget>
  ) => (
    <div data-testid='BasicBillingInfoWidget'>
      <div data-testid='BasicBillingInfoWidget-companyId'>
        {props.companyId}
      </div>
    </div>
  ),
  StaffBillingDetailsWidget: (
    props: ComponentProps<typeof StaffBillingDetailsWidget>
  ) => (
    <div data-testid='BillingDetailsWidget'>
      <div data-testid='BillingDetailsWidget-companyId'>{props.companyId}</div>
    </div>
  ),
  StaffBillingInformationNotesWidget: (
    props: ComponentProps<typeof StaffBillingInformationNotesWidget>
  ) => (
    <div data-testid='BillingInformationNotesWidget'>
      <div data-testid='BillingInformationNotesWidget-companyId'>
        {props.companyId}
      </div>
    </div>
  ),
  StaffCommissionWidget: (
    props: ComponentProps<typeof StaffCommissionWidget>
  ) => (
    <div data-testid='CommissionsWidget'>
      <div data-testid='CommissionsWidget-nodeId'>{props.nodeId}</div>
    </div>
  ),
  StaffConsolidationDefaultsWidget: (
    props: ComponentProps<typeof StaffConsolidationDefaultsWidget>
  ) => (
    <div data-testid='ConsolidationDefaultsWidget'>
      <div data-testid='ConsolidationDefaultsWidget-companyId'>
        {props.clientId}
      </div>
    </div>
  )
}))
jest.mock('@staff-portal/error-handling')

const arrangeTest = (props: ComponentProps<typeof Billing>) =>
  render(<Billing {...props} />)

const companyId = '123'

describe('Billing', () => {
  it('renders Billing Components', () => {
    const { getByTestId } = arrangeTest({ companyId })

    expect(getByTestId('BasicBillingInfoWidget-companyId')).toHaveTextContent(
      companyId
    )
    expect(getByTestId('BillingDetailsWidget-companyId')).toHaveTextContent(
      companyId
    )
    expect(
      getByTestId('BillingInformationNotesWidget-companyId')
    ).toHaveTextContent(companyId)
    expect(getByTestId('CommissionsWidget-nodeId')).toHaveTextContent(companyId)
  })
})
