import React from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import adjustValues from './adjustValues'
import PurchaseOrderCreateModal from '.'

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
jest.mock('../../../../data/setCreatePurchaseOrder.graphql.types', () => ({
  useSetCreatePurchaseOrderMutation: () => [jest.fn()]
}))
jest.mock('../../../../data')
jest.mock('@staff-portal/billing/src/data')

const render = () => renderComponent(<PurchaseOrderCreateModal />)

describe('PurchaseOrderCreateModal', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('PurchaseOrderCreateModalForm')).toBeInTheDocument()
  })

  describe('adjustValues', () => {
    it('omits empty values from root object', () => {
      expect(
        adjustValues({
          clientId__fake: 'fake id',
          clientName: 'Some name'
        })
      ).toEqual({})

      expect(
        adjustValues({
          amount: '',
          threshold: '',
          expiryDate: ''
        })
      ).toEqual({})

      expect(
        adjustValues({
          amount: '123.00',
          threshold: '123.00',
          expiryDate: '2020-12-16'
        })
      ).toEqual({
        amount: '123.00',
        threshold: '123.00',
        expiryDate: '2020-12-16'
      })
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
        { purchaseOrderLinesAttributes: [{}] }
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
            { threshold: '123', expiryDate: '2020-12-16' },
            { amount: '1' }
          ]
        }
      ]
    ])('%s', (_, input, expected) => {
      expect(adjustValues(input)).toEqual(expected)
    })
  })
})
