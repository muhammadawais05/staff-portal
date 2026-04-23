import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import NamedPagination from './NamedPagination'

const arrangeTest = (pages: string[]) => {
  render(
    <TestWrapper>
      <NamedPagination pages={pages} />
    </TestWrapper>
  )
}

describe('NamedPagination', () => {
  describe('when there is only one page', () => {
    it('does not show navigation buttons', () => {
      const pages = ['Page 1']

      arrangeTest(pages)

      expect(
        screen.queryByTestId('named-pagination-previous-button')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('named-pagination-next-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there are multiple pages', () => {
    const pages = ['Page 1', 'Page 2']

    it('disables previous button in the first page', () => {
      arrangeTest(pages)

      expect(
        screen.getByTestId('named-pagination-previous-button')
      ).toHaveAttribute('disabled')
    })

    it('disables next button in the last page', () => {
      arrangeTest(pages)

      fireEvent.click(screen.getByTestId('named-pagination-next-button'))

      expect(
        screen.getByTestId('named-pagination-next-button')
      ).toHaveAttribute('disabled')
    })
  })
})
