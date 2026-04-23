import React, { ComponentProps, ReactNode } from 'react'

import RowExpander from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof RowExpander>
) => renderComponent(<RowExpander {...props}>{children}</RowExpander>)

describe('RowExpander', () => {
  describe('when row is expanded', () => {
    it('default render', () => {
      const { container } = render(null, {
        handleOnClick: jest.fn(),
        isExpanded: true
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when row is collapsed', () => {
    it('default render', () => {
      const { container } = render(null, {
        handleOnClick: jest.fn(),
        isExpanded: false
      })

      expect(container).toMatchSnapshot()
    })
  })
})
