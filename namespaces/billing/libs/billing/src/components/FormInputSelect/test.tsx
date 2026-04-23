import React, { ComponentProps } from 'react'

import FormInputSelect from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof FormInputSelect>) =>
  renderComponent(<FormInputSelect {...props} />)

describe('FormInputSelect', () => {
  it('default render', () => {
    const { container } = render({
      input: {
        name: 'foo',
        onBlur: jest.fn(),
        onChange: jest.fn(),
        onFocus: jest.fn(),
        value: ''
      },
      inputProps: {
        options: [
          { text: 'option 1', value: '1' },
          { text: 'option 2', value: '2' }
        ]
      },
      meta: { error: undefined, touched: true }
    })

    expect(container).toMatchSnapshot()
  })
})
