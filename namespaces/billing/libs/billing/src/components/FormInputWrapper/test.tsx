import React from 'react'

import FormInputWrapper, { Props } from '.'
import renderComponent from '../../utils/tests'

const render = (props: Partial<Props>) =>
  renderComponent(<FormInputWrapper {...props} renderChild={() => <input />} />)

describe('FormInputWrapper', () => {
  describe('when field is NOT in error state', () => {
    it('renders a wrapped child component with no error', () => {
      const { container } = render({
        meta: {
          error: undefined,
          touched: undefined
        }
      })

      expect(container).toMatchSnapshot()
    })
  })

  describe('when field is in error state', () => {
    it('renders a wrapped child component with no error', () => {
      const { container } = render({
        meta: {
          error: 'error message',
          touched: true
        }
      })

      expect(container).toMatchSnapshot()
    })
  })
})
