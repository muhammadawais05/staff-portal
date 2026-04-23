import { cleanup } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import TransfersTableRow from '.'

jest.mock('../TableRowActions')

const render = (props: ComponentProps<typeof TransfersTableRow>) =>
  renderComponent(
    <table>
      <tbody>
        <TransfersTableRow onTransferActionClick={jest.fn()} {...props} />
      </tbody>
    </table>
  )

describe('TransfersTableRow', () => {
  afterEach(cleanup)

  it('default render', () => {
    const { container } = render({
      transfer: fixtures.MockTransfers.nodes[0]
    })

    expect(container).toMatchSnapshot()
  })

  describe(`when 'isStripeEven' is 'true'`, () => {
    it('default render', () => {
      const { container } = render({
        transfer: fixtures.MockTransfers.nodes[0],
        isStripeEven: true
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when a debt collection transfer has an associated fee', () => {
    it('default render', () => {
      const { container } = render({
        transfer: {
          ...fixtures.MockTransfers.nodes[0],
          feesTotalAmount: '100.0'
        }
      })

      expect(container).toMatchSnapshot()
    })
  })
})
