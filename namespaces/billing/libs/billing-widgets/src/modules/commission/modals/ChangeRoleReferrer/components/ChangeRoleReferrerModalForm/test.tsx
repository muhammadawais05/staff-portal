import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ChangeRoleReferrerModalForm from '.'

jest.mock('../ChangeRoleReferrerModalFormAutocomplete')

const render = (props: ComponentProps<typeof ChangeRoleReferrerModalForm>) =>
  renderComponent(<ChangeRoleReferrerModalForm {...props} />)

const testId = ChangeRoleReferrerModalForm.displayName

describe('ChangeRoleReferrerModalForm', () => {
  it('renders modal properly', () => {
    const { getByTestId } = render({ handleOnSubmit: jest.fn() })

    expect(getByTestId(`${testId}-title`)).toHaveTextContent('Change Referrer')
    expect(getByTestId(`${testId}-comment`)).toBeInTheDocument()
    expect(getByTestId(`${testId}Autocomplete`)).toBeInTheDocument()
    expect(getByTestId(`${testId}-submit`)).toHaveTextContent(
      'Reassign Referrer'
    )
  })

  describe('when the role can not issue a sourcing commission', () => {
    it('does not render notice', () => {
      const { queryByTestId } = render({ handleOnSubmit: jest.fn() })

      expect(queryByTestId(`${testId}-notice`)).toBeNull()
    })
  })

  describe('when the role can issue a sourcing commission', () => {
    it('renders notice', () => {
      const { getByTestId } = render({
        handleOnSubmit: jest.fn(),
        canIssueSourcingCommission: true
      })

      expect(getByTestId(`${testId}-notice`)).toHaveTextContent(
        'For referrals that have fixed sourcing commissions. payment will be sent immediately'
      )
    })
  })

  describe('when the role has a referrer', () => {
    it('sets autocomplete to required', () => {
      const { queryByTestId } = render({ handleOnSubmit: jest.fn() })

      expect(queryByTestId(`${testId}-notice`)).toBeNull()
    })
  })

  describe('when the role has no referrer', () => {
    it('sets autocomplete to non required', () => {
      const { getByTestId } = render({
        handleOnSubmit: jest.fn(),
        canIssueSourcingCommission: true
      })

      expect(getByTestId(`${testId}-notice`)).toHaveTextContent(
        'For referrals that have fixed sourcing commissions. payment will be sent immediately'
      )
    })
  })
})
