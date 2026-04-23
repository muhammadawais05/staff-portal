import React, { ComponentProps } from 'react'
import { screen } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import MockClient from '@staff-portal/billing/src/_fixtures/graphql/gateway/client'

import BillingOption from './BillingOption'

const render = (props: ComponentProps<typeof BillingOption>) =>
  renderComponent(<BillingOption {...props} />)

jest.mock('../BillingOptionDetails')

describe('BillingOption', () => {
  describe('when a billing option is not primary', () => {
    it(`renders a billing option section with 'Set primary' action`, () => {
      const { getByTestId, queryByTestId } = render({
        billingOption: MockClient.billingOptions.nodes[0],
        handleOnClick: jest.fn()
      })

      expect(getByTestId('BillingOption-creditCard-title')).toHaveTextContent(
        /^Credit Card$/
      )
      expect(
        getByTestId('BillingOption-creditCard-setPrimary')
      ).toHaveTextContent('Set Primary')
      expect(queryByTestId('BillingOption-creditCard-unsetPrimary')).toBeNull()

      expect(
        queryByTestId('BillingOptionDetails-billingOption')
      ).toHaveTextContent('"billingMethod":"CREDIT_CARD"')
    })
  })

  describe('when a billing option is primary', () => {
    it(`renders a billing option section with 'Unset primary' action`, () => {
      const { getByTestId, queryByTestId } = render({
        billingOption: {
          ...MockClient.billingOptions.nodes[0],
          preferred: true,
          operations: {
            ...MockClient.billingOptions.nodes[0].operations,
            preferEnterpriseBillingOption: {
              callable: OperationCallableTypes.HIDDEN,
              messages: []
            },
            unsetPreferredBillingOption: {
              callable: OperationCallableTypes.ENABLED,
              messages: []
            }
          }
        },
        handleOnClick: jest.fn()
      })

      expect(getByTestId('BillingOption-creditCard-title')).toHaveTextContent(
        'Credit Card (primary)'
      )
      expect(queryByTestId('BillingOption-creditCard-setPrimary')).toBeNull()
      expect(
        getByTestId('BillingOption-creditCard-unsetPrimary')
      ).toHaveTextContent('Unset Primary')
    })
  })

  describe('when a billing option is Wire', () => {
    it('renders a billing option section', () => {
      const { getByTestId } = render({
        billingOption: MockClient.billingOptions.nodes[1],
        handleOnClick: jest.fn()
      })

      expect(getByTestId('BillingOption-wire-title')).toHaveTextContent('Wire')
    })

    describe('and it requires verification', () => {
      beforeEach(() => {
        render({
          billingOption: {
            ...MockClient.billingOptions.nodes[1],
            operations: {
              ...MockClient.billingOptions.nodes[1].operations,
              verifyWireBillingOption: {
                callable: OperationCallableTypes.ENABLED,
                messages: []
              },
              unverifyWireBillingOption: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              preferEnterpriseBillingOption: {
                callable: OperationCallableTypes.DISABLED,
                messages: [
                  'Only verified payment methods can be set as primary.'
                ]
              },
              unsetPreferredBillingOption: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              }
            }
          },
          handleOnClick: jest.fn()
        })
      })

      it('renders a button to verify the billing option', () => {
        expect(
          screen.getByTestId('BillingOption-wire-verify')
        ).toHaveTextContent('Verify')
      })

      it('does not render a button to unverify the billing option', () => {
        expect(
          screen.queryByTestId('BillingOption-wire-unverify')
        ).not.toBeInTheDocument()
      })

      it(`renders a button to set billing option as primary, but it's disabled`, () => {
        expect(
          screen.getByTestId('BillingOption-wire-setPrimary')
        ).toHaveAttribute('aria-disabled', 'true')
      })
    })

    describe('and it is verified', () => {
      beforeEach(() => {
        render({
          billingOption: {
            ...MockClient.billingOptions.nodes[1],
            operations: {
              ...MockClient.billingOptions.nodes[1].operations,
              preferEnterpriseBillingOption: {
                callable: OperationCallableTypes.ENABLED,
                messages: []
              },
              unsetPreferredBillingOption: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              verifyWireBillingOption: {
                callable: OperationCallableTypes.HIDDEN,
                messages: []
              },
              unverifyWireBillingOption: {
                callable: OperationCallableTypes.ENABLED,
                messages: []
              }
            }
          },
          handleOnClick: jest.fn()
        })
      })

      it('renders a button to unverify the billing option', () => {
        expect(
          screen.getByTestId('BillingOption-wire-unverify')
        ).toHaveTextContent('Unverify')
      })

      it('does not render a button to verify the billing option', () => {
        expect(
          screen.queryByTestId('BillingOption-wire-verify')
        ).not.toBeInTheDocument()
      })

      it(`renders a button to set billing option as primary, and it's disabled`, () => {
        expect(
          screen.getByTestId('BillingOption-wire-setPrimary')
        ).not.toHaveAttribute('aria-disabled')
      })
    })

    it('renders a button to update the billing option', () => {
      const { getByTestId } = render({
        billingOption: MockClient.billingOptions.nodes[1],
        handleOnClick: jest.fn()
      })

      expect(getByTestId('BillingOption-wire-update')).toHaveTextContent('Edit')
    })
  })

  describe('when a billing option is Paypal', () => {
    it('renders a button to update the billing option', () => {
      const { getByTestId } = render({
        billingOption: MockClient.billingOptions.nodes[2],
        handleOnClick: jest.fn()
      })

      expect(getByTestId('BillingOption-paypal-update')).toHaveTextContent(
        'Edit'
      )
    })
  })
})
