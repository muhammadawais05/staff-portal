import React, { ComponentProps } from 'react'

import MultiLineTooltipContent from '.'
import renderComponent from '../../../utils/tests'

const render = (props: ComponentProps<typeof MultiLineTooltipContent>) =>
  renderComponent(<MultiLineTooltipContent {...props} />)

describe('MultiLineTooltipContent', () => {
  it('default render', () => {
    const messages = ['one', 'two', 'three']
    const { container } = render({
      messages
    })

    messages.forEach(message => {
      expect(container).toHaveTextContent(message)
    })
  })
})
