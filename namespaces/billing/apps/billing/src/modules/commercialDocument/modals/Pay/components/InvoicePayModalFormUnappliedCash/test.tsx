import { FinalForm, useForm } from '@toptal/picasso-forms'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import InvoicePayModalFormUnappliedCash from '.'

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: jest.fn()
}))

const mockUseForm = useForm as jest.Mock
const onChangeForm = jest.fn()

const render = (
  props: ComponentProps<typeof InvoicePayModalFormUnappliedCash>
) =>
  renderComponent(
    <FinalForm onSubmit={jest.fn()}>
      {() => <InvoicePayModalFormUnappliedCash {...props} />}
    </FinalForm>
  )

describe('InvoicePayModalFormUnappliedCash', () => {
  beforeEach(() => {
    mockUseForm.mockReturnValue({
      change: onChangeForm
    })
  })

  describe('when only one client is provided', () => {
    it('should call form.change for balance and id fields and not render', () => {
      const { queryByTestId } = render({
        clients: [
          {
            id: 'id',
            unappliedCashBalance: '5000.0',
            fullName: 'name',
            unappliedCashEntries: {
              nodes: [
                {
                  id: 'uc-id',
                  effectiveDate: '2022-04-21',
                  availableAmount: '3000.0'
                }
              ]
            }
          }
        ]
      })

      expect(onChangeForm).toHaveBeenNthCalledWith(
        1,
        'unappliedCashAmount',
        '3000.0'
      )

      expect(onChangeForm).toHaveBeenNthCalledWith(
        2,
        'unappliedCashId',
        'uc-id'
      )

      expect(
        queryByTestId('payment-unapplied-cash-client')
      ).not.toBeInTheDocument()
    })
  })
  describe('when several clients are provided', () => {
    beforeAll(jest.clearAllMocks)

    it('should render the client selector', () => {
      const { getByTestId } = render({
        clients: [
          {
            id: 'id0',
            unappliedCashBalance: '123',
            fullName: 'name0',
            unappliedCashEntries: {
              nodes: [
                {
                  id: 'uc-id1',
                  effectiveDate: '2022-04-21',
                  availableAmount: '3000.0'
                }
              ]
            }
          },
          {
            id: 'id2',
            unappliedCashBalance: '321',
            fullName: 'name2',
            unappliedCashEntries: {
              nodes: [
                {
                  id: 'uc-id',
                  effectiveDate: '2022-04-21',
                  availableAmount: '3000.0'
                }
              ]
            }
          }
        ]
      })

      expect(onChangeForm).not.toHaveBeenCalled()

      expect(
        getByTestId('InvoicePayModalFormUnappliedCash')
      ).toBeInTheDocument()
      expect(getByTestId('payment-unapplied-cash-client')).toBeInTheDocument()
    })
  })
})
