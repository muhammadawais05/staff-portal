import React, { ComponentProps } from 'react'
import { DetailedList } from '@staff-portal/ui'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import MockClient from '@staff-portal/billing/src/_fixtures/graphql/gateway/client'

import BillingOptionDetails from './BillingOptionDetails'
import VerificationStatus from '../VerificationStatus'

jest.mock('@staff-portal/ui', () => ({
  DetailedList: jest.fn(() => <span>DetailedList</span>)
}))

const render = (props: ComponentProps<typeof BillingOptionDetails>) =>
  renderComponent(<BillingOptionDetails {...props} />)

describe('BillingOptionDetails', () => {
  it('renders DetailedList properly when canManageBillingOptions is true', () => {
    render({
      billingOption: MockClient.billingOptions.nodes[0],
      canManageBillingOptions: true
    })

    expect(DetailedList).toHaveBeenCalledWith(
      {
        columns: 1,
        items: [
          { label: 'Name', value: 'John Talbot' },
          { label: 'Number', value: '**** **** **** 1324' },
          { label: 'Expires', value: '12/2015' },
          { label: 'Type', value: 'MasterCard' },
          {
            label: 'Verification status',
            value: expect.objectContaining({
              type: VerificationStatus,
              props: {
                billingMethod: 'CREDIT_CARD',
                comment: 'Example comment.',
                status: 'VERIFIED',
                verificationStatuses: ['CAN_BE_CHARGED']
              }
            })
          }
        ],
        labelColumnWidth: 12,
        striped: true
      },
      {}
    )
  })

  it('renders DetailedList properly when canManageBillingOptions is false', () => {
    render({
      billingOption: MockClient.billingOptions.nodes[0],
      canManageBillingOptions: false
    })

    expect(DetailedList).toHaveBeenCalledWith(
      {
        columns: 1,
        items: [
          {
            label: 'Verification status',
            value: expect.objectContaining({
              type: VerificationStatus,
              props: {
                billingMethod: 'CREDIT_CARD',
                comment: 'Example comment.',
                status: 'VERIFIED',
                verificationStatuses: ['CAN_BE_CHARGED']
              }
            })
          }
        ],
        labelColumnWidth: 12,
        striped: true
      },
      {}
    )
  })
})
