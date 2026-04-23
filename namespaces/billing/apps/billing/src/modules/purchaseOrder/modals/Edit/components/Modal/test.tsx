import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import PurchaseOrderEditModal from '.'
import adjustValues from './adjustValues'

jest.mock('../ModalForm')
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
jest.mock('../../../../data/setUpdatePurchaseOrder.graphql.types', () => ({
  useSetUpdatePurchaseOrderMutation: () => [jest.fn()]
}))

jest.mock('../../../../data')

const render = () =>
  renderComponent(<PurchaseOrderEditModal options={{ nodeId: '123' }} />)

describe('PurchaseOrderEditModal', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('PurchaseOrderEditModalForm')).toBeInTheDocument()
  })
})

describe('adjustValues', () => {
  it('omits empty values from root object', () => {
    expect(
      adjustValues({
        clientId__fake: 'fake id',
        clientName: 'Some name',
        number: '100',
        clientId: 'client-id'
      })
    ).toEqual({})
  })

  it.each([
    [
      'omits empty amount, threshold, expiryDate from purchaseOrderLinesAttributes array',
      {
        purchaseOrderLinesAttributes: [
          {
            amount: '',
            threshold: '',
            expiryDate: ''
          }
        ]
      },
      {
        purchaseOrderLinesAttributes: [
          {
            amount: null,
            threshold: null
          }
        ]
      }
    ],
    [
      'omits all occurunces of invalid values from purchaseOrderLinesAttributes array',
      {
        clientId__fake: 'fake id',
        purchaseOrderLinesAttributes: [
          {
            amount: '',
            threshold: '123',
            expiryDate: '2020-12-16',
            disabled: true
          },
          {
            amount: '1',
            threshold: '',
            expiryDate: '',
            disabled: false
          }
        ]
      },
      {
        purchaseOrderLinesAttributes: [
          { amount: null, threshold: '123', expiryDate: '2020-12-16' },
          { amount: '1', threshold: null }
        ]
      }
    ]
  ])('%s', (_, input, expected) => {
    expect(adjustValues(input)).toEqual(expected)
  })
})
