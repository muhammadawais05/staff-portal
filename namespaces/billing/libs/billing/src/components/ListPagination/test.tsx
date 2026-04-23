import React, { ComponentProps } from 'react'

import ListPagination from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof ListPagination>) =>
  renderComponent(<ListPagination {...props} />)

describe('InvoiceListPagination', () => {
  describe('when multiple page data provided', () => {
    it('renders `Pagination` properly', () => {
      const { getByTestId } = render({
        itemCount: 100,
        page: 2,
        pageSize: 25,
        onPageChange: jest.fn()
      })

      expect(getByTestId('ListPagination')).toBeInTheDocument()
      expect(getByTestId('Pagination').innerHTML).toBe('[2,25,100]')
    })
  })

  describe('when only a single page data provided', () => {
    it('renders `Pagination` properly', () => {
      const { getByTestId } = render({
        itemCount: 100,
        onPageChange: jest.fn()
      })

      expect(getByTestId('ListPagination')).toBeInTheDocument()
      expect(getByTestId('Pagination').innerHTML).toBe('[null,null,100]')
    })
  })
})
