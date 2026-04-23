import React, { ComponentProps } from 'react'
import { Amount } from '@toptal/picasso'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderAmount from '.'

jest.mock('@toptal/picasso/Amount', () => jest.fn())

const AmountMock = Amount as unknown as jest.Mock

const render = (props: ComponentProps<typeof PurchaseOrderAmount>) =>
  renderComponent(
    <PurchaseOrderAmount
      {...props}
      // color will be ignored
      color='dark-grey'
      weight='semibold'
      size='medium'
    />
  )

describe('PurchaseOrderAmount', () => {
  beforeEach(() => {
    AmountMock.mockImplementation(({ amount }) => amount)
  })

  it('renders Amount properly', () => {
    render({
      purchaseOrder: {
        invoicedAmount: 1500,
        threshold: 75,
        totalAmount: 2000
      }
    })

    expect(AmountMock).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 1500
      }),
      expect.anything()
    )
  })

  describe('when weight passed from the parent', () => {
    it('renders as semibold Amount', () => {
      render({
        purchaseOrder: {
          invoicedAmount: 1500,
          threshold: 75,
          totalAmount: 2000
        }
      })

      expect(AmountMock).toHaveBeenCalledWith(
        expect.objectContaining({
          weight: 'semibold'
        }),
        expect.anything()
      )
    })
  })

  describe('when size passed from the parent', () => {
    it('renders as medium Amount', () => {
      render({
        purchaseOrder: {
          invoicedAmount: 1500,
          threshold: 75,
          totalAmount: 2000
        }
      })

      expect(AmountMock).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 'medium'
        }),
        expect.anything()
      )
    })
  })

  describe('when color passed from the parent', () => {
    it('ignores the color prop', () => {
      render({
        purchaseOrder: {
          invoicedAmount: 1500,
          threshold: 75,
          totalAmount: 2000
        }
      })

      expect(AmountMock).toHaveBeenCalledWith(
        expect.objectContaining({
          color: 'yellow'
        }),
        expect.anything()
      )
    })
  })
})
