import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrdersListTableRow from '.'

jest.mock('@staff-portal/billing/src/components/LinkWrapper')
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  TypographyOverflow: jest.fn().mockImplementation(props => (
    <div data-testid={props['data-testid']}>
      <span data-testid={`${props['data-testid']}-tooltipContent`}>
        {props.tooltipContent}
      </span>
      <span data-testid={`${props['data-testid']}-lines`}>{props.lines}</span>
      <span data-testid={`${props['data-testid']}-weight`}>{props.weight}</span>
      <span data-testid={`${props['data-testid']}-children`}>
        {props.children}
      </span>
    </div>
  )),
  Tooltip: jest.fn().mockImplementation(({ children, content }) => (
    <div data-testid='Tooltip'>
      <div data-testid='Tooltip-content'>{content}</div>
      <div data-testid='Tooltip-children'>{children}</div>
    </div>
  ))
}))

const render = (props: ComponentProps<typeof PurchaseOrdersListTableRow>) =>
  renderComponent(<PurchaseOrdersListTableRow {...props} />)

describe('PurchaseOrdersListTableCellNumber', () => {
  describe('when PO is archived', () => {
    it('renders archived PO number', () => {
      const { getByTestId, queryByTestId } = render({
        purchaseOrder: {
          archived: true,
          poNumber: '1545',
          webResource: { url: 'aaa', text: 'bbb' }
        }
      })

      expect(queryByTestId('PurchaseOrdersListTableRow-unarchived')).toBeNull()

      expect(
        getByTestId('PurchaseOrdersListTableRow-archived')
      ).toBeInTheDocument()
      expect(
        getByTestId('PurchaseOrdersListTableRow-archived-tooltipContent')
      ).toContainHTML('1545')

      expect(getByTestId('Tooltip')).toBeInTheDocument()
      expect(getByTestId('Tooltip-content')).toContainHTML(
        'This Purchase Order was archived.'
      )
    })
  })

  describe('when PO is not archived', () => {
    it('renders unarchived PO number', () => {
      const { getByTestId, queryByTestId } = render({
        purchaseOrder: {
          archived: false,
          poNumber: '1545',
          webResource: { url: 'aaa', text: 'bbb' }
        }
      })

      expect(queryByTestId('PurchaseOrdersListTableRow-archived')).toBeNull()
      expect(queryByTestId('Tooltip')).toBeNull()

      expect(
        getByTestId('PurchaseOrdersListTableRow-unarchived')
      ).toBeInTheDocument()
      expect(
        getByTestId('PurchaseOrdersListTableRow-unarchived-tooltipContent')
      ).toContainHTML('1545')
    })
  })
})
