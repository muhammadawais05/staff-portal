import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import WireVerificationModalForm from '.'

const render = (props: ComponentProps<typeof WireVerificationModalForm>) =>
  renderComponent(<WireVerificationModalForm {...props} />)

describe('WireVerificationModalForm', () => {
  describe(`when it's a form in verify mode`, () => {
    it('default render', () => {
      const { getByTestId, getByPlaceholderText } = render({
        handleOnSubmit: jest.fn(),
        isVerify: true
      })

      expect(
        getByTestId(`${WireVerificationModalForm.displayName}-title`)
      ).toHaveTextContent('Verify Billing Option')
      expect(
        getByTestId(`${WireVerificationModalForm.displayName}-comment`)
      ).toHaveTextContent('Payment Identifier')
      expect(
        getByPlaceholderText(
          'Enter unique identifier and any other comments. This is visible to admins only.'
        )
      ).toBeInTheDocument()
      expect(getByTestId('submit')).toHaveTextContent('Verify')
    })
  })

  describe(`when it's a form in unverify mode`, () => {
    it('default render', () => {
      const { getByTestId, getByPlaceholderText } = render({
        handleOnSubmit: jest.fn(),
        isVerify: false
      })

      expect(
        getByTestId(`${WireVerificationModalForm.displayName}-title`)
      ).toHaveTextContent('Unverify Billing Option')
      expect(
        getByTestId(`${WireVerificationModalForm.displayName}-message`)
      ).toHaveTextContent(
        'This will mark billing options as pending verification'
      )
      expect(
        getByTestId(`${WireVerificationModalForm.displayName}-comment`)
      ).toHaveTextContent('Comment')
      expect(
        getByPlaceholderText(
          'Put additional details here, this comment is visible to admins only'
        )
      ).toBeInTheDocument()
      expect(getByTestId('submit')).toHaveTextContent('Unverify')
    })
  })
})
