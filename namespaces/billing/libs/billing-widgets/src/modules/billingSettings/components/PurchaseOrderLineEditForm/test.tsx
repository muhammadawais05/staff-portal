import React from 'react'
import { Form } from '@toptal/picasso-forms'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { fireEvent } from '@testing-library/react'
import { noop } from '@toptal/picasso/utils'

import PurchaseOrderLineEditForm from '.'

type Props = {
  currentPOid?: string
  nextPOid?: string
}

jest.mock('../../data')

const mockedChange = jest.fn()

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  useForm: () => ({ change: mockedChange })
}))

const render = ({ currentPOid }: Props) =>
  renderComponent(
    <Form onSubmit={noop}>
      <PurchaseOrderLineEditForm
        data={{ nodes: [] }}
        currentPOid={currentPOid}
      />
    </Form>
  )

describe('PurchaseOrderLineEditForm', () => {
  it('calls options query with options based on current/next PO', () => {
    const { getByTestId } = render({
      currentPOid: 'foo',
      nextPOid: 'bar'
    })

    expect(getByTestId('purchase-order')).toHaveTextContent('Purchase Order')
  })

  describe('when a PO with no PO lines is selected', () => {
    it('clears any previously selected PO lines', () => {
      const { getByTestId } = render({
        currentPOid: 'foo',
        nextPOid: 'bar'
      })

      fireEvent.change(
        getByTestId('purchase-order').querySelector(
          '#purchaseOrderId'
        ) as Element,
        {
          target: { value: 'VjEtUHVyY2hhc2VPcmRlci0xNTIz' }
        }
      )

      fireEvent.change(
        getByTestId('purchase-order').querySelector(
          '#purchaseOrderId'
        ) as Element,
        {
          target: { value: 'VjEtUHVyY2hhc2VPcmRlci0xNTY5' }
        }
      )

      expect(mockedChange).toHaveBeenLastCalledWith(
        'purchaseOrderLineId',
        undefined
      )
    })
  })
})
