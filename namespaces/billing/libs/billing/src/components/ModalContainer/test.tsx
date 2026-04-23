import React, { ComponentProps } from 'react'

import renderComponent from '../../utils/tests'
import ModalContainer from '.'

const render = (props: ComponentProps<typeof ModalContainer> = {}) =>
  renderComponent(<ModalContainer {...props} />)

describe('ModalContainer', () => {
  it('default render', () => {
    const { container } = render()

    expect(container).toMatchSnapshot()
  })
})
