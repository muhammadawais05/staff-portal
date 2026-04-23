import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { omit } from 'lodash-es'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PurchaseOrdersListTableRow from '.'

const purchaseOrder = {
  ...omit(fixtures.MockPurchaseOrders.nodes[0], [
    'budgetLeft',
    'operations',
    'notes',
    'number'
  ]),
  archived: false,
  client: {
    webResource: {
      url: '',
      text: ''
    }
  }
}

jest.mock('../PurchaseOrdersListTableCellNumber')

const render = (props: ComponentProps<typeof PurchaseOrdersListTableRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <PurchaseOrdersListTableRow {...props} />
      </Table.Body>
    </Table>
  )

describe('PurchaseOrdersListTableRow', () => {
  it(`will render '${EMPTY_DATA}' on totalAmount field if that is missing`, () => {
    const { getByTestId } = render({
      isEven: false,
      purchaseOrder: {
        ...purchaseOrder,
        totalAmount: undefined
      }
    })

    expect(
      getByTestId('PurchaseOrdersListTableRow-totalAmount')
    ).toHaveTextContent(EMPTY_DATA)
  })

  it(`will render ${EMPTY_DATA} on threshold field if that is missing`, () => {
    const { getByTestId } = render({
      isEven: false,
      purchaseOrder: {
        ...purchaseOrder,
        threshold: undefined
      }
    })

    expect(
      getByTestId('PurchaseOrdersListTableRow-threshold')
    ).toHaveTextContent(EMPTY_DATA)
  })

  // TODO: remove describe once poLines is released
  describe('poLines experiment is enabled', () => {
    it('will render po lines instead of threshold field', () => {
      const { queryByTestId } = render({
        poLinesEnabled: true,
        isEven: false,
        purchaseOrder: {
          ...purchaseOrder,
          draftedAmount: '500',
          threshold: undefined
        }
      })

      expect(
        queryByTestId('PurchaseOrdersListTableRow-draftedTotal')
      ).toHaveTextContent('500')

      expect(
        queryByTestId('PurchaseOrdersListTableRow-threshold')
      ).not.toBeInTheDocument()
    })
  })
})
