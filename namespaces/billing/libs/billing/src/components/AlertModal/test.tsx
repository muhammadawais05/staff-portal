import React, { ComponentProps } from 'react'

import AlertModal from '.'
import renderComponent from '../../utils/tests'

jest.mock('../ModalFooter')

const render = (props: ComponentProps<typeof AlertModal>) =>
  renderComponent(<AlertModal {...props} />)

describe('AlertModal', () => {
  it('default render', () => {
    const { container } = render({
      message: 'Some message',
      title: 'Modal title'
    })

    expect(container).toMatchSnapshot()
  })

  it('renders custom cancel button text', () => {
    const { container } = render({
      buttonText: 'Custom cancel button text',
      message: 'Some message',
      title: 'Modal title'
    })

    expect(container).toMatchSnapshot()
  })
})
