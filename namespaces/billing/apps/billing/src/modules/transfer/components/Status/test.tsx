import React, { ComponentProps } from 'react'
import { TransferStatus as Status } from '@staff-portal/graphql/staff'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { getTransferStatus } from './TransferStatus'
import TransferStatus from '.'

jest.mock('../TableRowActions')

const render = (props: ComponentProps<typeof TransferStatus>) =>
  renderComponent(<TransferStatus {...props} />)

describe('#getTransferStatus()', () => {
  describe.each`
    status                   | value              | color
    ${Status.SUCCEEDED}      | ${'Paid'}          | ${'green'}
    ${Status.REFUNDED}       | ${'Refunded'}      | ${'yellow'}
    ${Status.PENDING}        | ${'Pending'}       | ${'yellow'}
    ${Status.PENDING_REFUND} | ${'Pend. refund'}  | ${'yellow'}
    ${Status.FAILED}         | ${'Failed'}        | ${'red'}
    ${Status.FAILED_REFUND}  | ${'Failed refund'} | ${'red'}
    ${Status.CANCELLED}      | ${'Cancelled'}     | ${'dark-grey'}
    ${'any other case'}      | ${'—'}             | ${'dark-grey'}
  `('when status is `$status`', ({ status, value, color }) => {
    it(`will return status ${value} and color ${color}`, () => {
      const actual = getTransferStatus(status)
      const expected = { color, value }

      expect(actual).toEqual(expected)
    })

    it(`will render text ${value} with color ${color}`, () => {
      const { getByText } = render({ status })

      expect(getByText(value)).toBeInTheDocument()
    })
  })
})
