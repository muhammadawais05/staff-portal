import React, { ComponentProps } from 'react'
import { BillingMethodName } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import BillingOptionUpdateModalForm from './index'

const render = (props: ComponentProps<typeof BillingOptionUpdateModalForm>) =>
  renderComponent(<BillingOptionUpdateModalForm {...props} />)

describe('BillingOptionUpdateModalForm', () => {
  it('display a title and an edit button', () => {
    const { getByTestId } = render({
      handleOnSubmit: jest.fn(),
      initialValues: {
        bankName: 'bank name',
        nameOnAccount: 'name on account'
      },
      billingMethod: BillingMethodName.WIRE,
      title: 'Title of the modal'
    })

    expect(getByTestId('BillingOptionUpdateModalForm-title')).toHaveTextContent(
      'Title of the modal'
    )
    expect(getByTestId('submit')).toHaveTextContent('Update')
  })

  describe('when a billing method is Wire', () => {
    it('render fields for bank name and name on account', () => {
      const { getByTestId } = render({
        handleOnSubmit: jest.fn(),
        initialValues: {
          bankName: 'bank name',
          nameOnAccount: 'name on account'
        },
        billingMethod: BillingMethodName.WIRE,
        title: 'Title of the modal'
      })

      expect(
        getByTestId('BillingOptionUpdateModalForm-nameOnAccount')
      ).toHaveTextContent('Name on Account')
      expect(
        getByTestId('BillingOptionUpdateModalForm-bankName')
      ).toHaveTextContent('Bank Name')
    })
  })

  describe('when a billing method is Paypal', () => {
    it('render fields for username and business name', () => {
      const { getByTestId } = render({
        handleOnSubmit: jest.fn(),
        initialValues: {
          username: 'username',
          businessName: 'business name'
        },
        billingMethod: BillingMethodName.PAYPAL,
        title: 'Title of the modal'
      })

      expect(
        getByTestId('BillingOptionUpdateModalForm-username')
      ).toHaveTextContent('Email')
      expect(
        getByTestId('BillingOptionUpdateModalForm-businessName')
      ).toHaveTextContent('Business Name')
    })
  })
})
