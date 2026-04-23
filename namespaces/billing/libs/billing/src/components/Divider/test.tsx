import React from 'react'

import Divider from '.'
import renderComponent from '../../utils/tests'

const render = () => renderComponent(<Divider />)

describe('Divider', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('divider')).toBeInTheDocument()
  })
})
