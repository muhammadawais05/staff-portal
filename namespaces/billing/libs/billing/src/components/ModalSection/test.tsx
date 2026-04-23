import React, { ComponentProps, ReactNode } from 'react'

import ModalSection from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof ModalSection>
) => renderComponent(<ModalSection {...props}>{children}</ModalSection>)

describe('ModalSection', () => {
  describe('prop `hasBorderMargin` is `true`', () => {
    it('default render', () => {
      const { container } = render(null, {
        hasBorderMargin: true,
        title: 'Total',
        titleColor: 'green'
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('prop `hasBorderMargin` is `false`', () => {
    it('default render', () => {
      const { container } = render(null, {
        hasBorderMargin: false,
        title: 'Total',
        titleColor: 'green'
      })

      expect(container).toMatchSnapshot()
    })
  })
})
