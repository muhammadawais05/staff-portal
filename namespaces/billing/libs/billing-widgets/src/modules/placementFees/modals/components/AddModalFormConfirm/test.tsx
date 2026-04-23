import React, { ComponentProps } from 'react'
import { EMPTY_DATA } from '@staff-portal/billing/src/_lib/helpers'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import AddModalFormConfirm from '.'
import { getSelectedOptionText } from './utils'

const render = (props: ComponentProps<typeof AddModalFormConfirm>) =>
  renderComponent(<AddModalFormConfirm {...props} />)

describe('AddModalFormConfirm', () => {
  it('default render', () => {
    const { getAllByRole } = render({
      totalAmount: 1500,
      values: {
        installments: [
          { amount: '1000', dueDate: '2015-05-15' },
          { amount: '500', dueDate: '2015-06-15' }
        ],
        purchaseOrderId: 'example1'
      }
    })

    const cells = getAllByRole('cell')

    expect(cells[0]).toContainHTML('May 15, 2015')
    expect(cells[1]).toContainHTML('1000')
    expect(cells[2]).toContainHTML('—')
    expect(cells[3]).toContainHTML('Jun 15, 2015')
    expect(cells[4]).toContainHTML('500')
    expect(cells[5]).toContainHTML('—')
  })
})

describe('#getSelectedOptionText', () => {
  describe('when no id value has been provided', () => {
    it('return empty placeholder', () => {
      expect(
        getSelectedOptionText(
          [
            { text: 'selectedValue', value: 'example1' },
            { text: 'abc', value: 'example2' }
          ],
          undefined
        )
      ).toBe(EMPTY_DATA)
    })
  })

  describe('when selected option has been found', () => {
    it('return selected value', () => {
      expect(
        getSelectedOptionText(
          [
            { text: 'selectedValue', value: 'example1' },
            { text: 'abc', value: 'example2' }
          ],
          'example1'
        )
      ).toBe('selectedValue')
    })
  })

  describe('when selected option has not been found', () => {
    it('return empty placeholder', () => {
      expect(
        getSelectedOptionText(
          [
            { text: 'selectedValue', value: 'example1' },
            { text: 'abc', value: 'example2' }
          ],
          'example3'
        )
      ).toBe(EMPTY_DATA)
    })
  })
})
