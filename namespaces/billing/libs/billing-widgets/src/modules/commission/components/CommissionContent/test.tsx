import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import CommissionContent from '.'
import { getCommissionDetailedList, useCommission } from '../../utils'

jest.mock('../../utils')
;(useCommission as jest.Mock).mockReturnValue({
  handleOnActionClick: jest.fn()
})

const commissionData = fixtures.MockGetCommission

const render = (props: ComponentProps<typeof CommissionContent>) =>
  renderComponent(<CommissionContent {...props} />)

describe('CommissionContent', () => {
  describe('when there are no commissions', () => {
    it('does not render component', () => {
      const { queryByTestId } = render({ commissionData: undefined })

      expect(queryByTestId('Section-title')).toBeNull()
      expect(queryByTestId('Section')).toBeNull()
    })
  })

  describe('when `Commission` is defined', () => {
    it('renders component', () => {
      const { getByTestId } = render({
        commissionData
      })

      expect(getByTestId('Section-title')).toHaveTextContent(
        'Commissions (out of 5.0% pot)'
      )
      expect(getCommissionDetailedList).toHaveBeenCalledTimes(1)
      expect(getCommissionDetailedList).toHaveBeenCalledWith({
        commissionData,
        handleOnClick: expect.any(Function)
      })
    })
  })
})
