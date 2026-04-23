import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import PurchaseOrderLineEdit from '.'
import adjustValues from './adjustValues'

jest.mock('../PurchaseOrderLineEditForm')
jest.mock('@staff-portal/billing/src/_lib/form/handlers', () => ({
  handleOnSubmissionError: jest.fn(),
  handleSubmit: jest.fn(() => jest.fn())
}))
jest.mock(
  '@staff-portal/billing/src/_lib/customHooks/useFormSubmission',
  () => () => ({
    handleOnRootLevelError: jest.fn(),
    handleOnSuccess: jest.fn()
  })
)
jest.mock('../../data')

const render = () =>
  renderComponent(
    <PurchaseOrderLineEdit
      refetch={jest.fn()}
      job={{
        ...fixtures.MockBillingSettingsJob.data.node,
        purchaseOrderLine: {
          purchaseOrder: {
            id: 'FAKEPO-0000',
            poNumber: 'FAKEPO-0000',
            webResource: {
              text: 'FAKEPO-0000',
              url: 'https://staff-portal.toptal.net/purchase_orders/0000/'
            }
          },
          id: 'VjEtUHVyY2hhc2VPcmRlci0xNTIy',
          poLineNumber: 'FAKEPO-0000-L-0000',
          webResource: {
            text: 'FAKEPO-0000-L-0000',
            url: 'https://staff-portal.toptal.net/purchase_orders/0000/lines/1522'
          }
        }
      }}
    />
  )

describe('PurchaseOrderLineEdit', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('edit')).toBeInTheDocument()
    expect(getByTestId('po-link')).toContainHTML('FAKEPO-0000')
  })
})

describe('#adjustValues', () => {
  it('omits useless values', () => {
    const actual = adjustValues({
      purchaseOrderId: '1',
      nextPurchaseOrderId: '2'
    })
    const expected = {}

    expect(actual).toEqual(expected)
  })
})
