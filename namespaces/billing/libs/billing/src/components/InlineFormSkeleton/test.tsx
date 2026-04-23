import React, { ComponentProps } from 'react'

import InlineFormSkeleton from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof InlineFormSkeleton>) =>
  renderComponent(<InlineFormSkeleton {...props} />)

const mockTitle = 'Example form title'

describe('ModalSkeleton', () => {
  it('default render', () => {
    const { container } = render({ title: <>{mockTitle}</> })

    expect(container).toHaveTextContent(mockTitle)
  })
})
