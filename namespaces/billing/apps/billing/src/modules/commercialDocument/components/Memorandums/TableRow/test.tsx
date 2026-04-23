import React from 'react'
import { Memorandum, MemorandumBalance } from '@staff-portal/graphql/staff'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { mapBalanceToColor } from './TableRow'
import TableRow from '.'

jest.mock('../TableRowActions')
jest.mock('../AllocatedDocumentLinks')

const render = (memorandum: Partial<Memorandum> = {}) =>
  renderComponent(
    <table>
      <tbody>
        <TableRow
          handleMemorandumActionClick={jest.fn()}
          memorandum={{ ...fixtures.MockMemorandum, ...memorandum }}
        />
      </tbody>
    </table>
  )

describe('TableRow', () => {
  describe('when memo has no portions', () => {
    it('does not render amount that is left', () => {
      const { queryByTestId } = render({
        amount: '2000',
        amountDue: '500',
        portions: []
      })
      const amountDue = queryByTestId('amount-left')

      expect(amountDue).not.toBeInTheDocument()
    })
  })

  describe('when memo has at least one portion', () => {
    const memoWithPortion = {
      allocated: false,
      amount: '2000',
      amountDue: '500',
      portions: [
        {
          __typename: 'Memorandum',
          current: true,
          document: {
            __typename: 'Invoice',
            id: 'VjEtSW52b2ljZS0zNzcyNDk',
            invoiceKind: 'COMPANY_BILL'
          },
          id: 'VjEtTWVtb3JhbmR1bS0xMTI1NDg',
          number: 112547
        },
        {
          __typename: 'Memorandum',
          document: {
            __typename: 'Invoice',
            id: 'VjEtSW52b2ljZS0zMTU5MjQ',
            invoiceKind: 'COMPANY_BILL'
          },
          id: 'VjEtTWVtb3JhbmR1bS0xMTMyMjI',
          number: 112547
        }
      ]
    }

    it('renders portions', () => {
      const { queryByTestId } = render(memoWithPortion)
      const portions = queryByTestId('AllocatedDocumentLinks')

      expect(portions).toBeInTheDocument()
    })

    it('renders amount that is left', () => {
      const { queryByTestId } = render(memoWithPortion)
      const amountDue = queryByTestId('amount-left')

      expect(amountDue).toBeInTheDocument()
    })
  })
})

describe('#mapBalanceToColor', () => {
  it('returns green color as a default color', () => {
    const expected = 'green'
    const actual = mapBalanceToColor(null)

    expect(actual).toEqual(expected)
  })

  it('returns red color when balance is Credit', () => {
    const expected = 'red'
    const actual = mapBalanceToColor(MemorandumBalance.CREDIT)

    expect(actual).toEqual(expected)
  })
})
