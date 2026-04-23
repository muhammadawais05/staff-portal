import React, { ComponentProps, ReactNode } from 'react'

import ModalFooter from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof ModalFooter>
) => renderComponent(<ModalFooter {...props}>{children}</ModalFooter>)

describe('ModalFooter', () => {
  describe('`hasCancelButton` is `false`', () => {
    it('default render', () => {
      const { container } = render(<h1>Test</h1>, {
        hasCancelButton: false
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('`hasCancelButton` is `true`', () => {
    describe('`children` defined', () => {
      it('default render', () => {
        const { container } = render(<h1>Test</h1>, {})

        expect(container).toMatchSnapshot()
      })
    })

    describe('`children` undefined', () => {
      it('default render', () => {
        const { container } = render(undefined, {})

        expect(container).toMatchSnapshot()
      })
    })
  })
})
