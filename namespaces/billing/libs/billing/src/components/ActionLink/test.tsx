import React from 'react'

import ActionLink from '.'
import renderComponent from '../../utils/tests'

const render = () => renderComponent(<ActionLink>link</ActionLink>)

describe('ActionLink', () => {
  it('default render', () => {
    const { getByTestId } = render()

    expect(getByTestId('ActionLink')).toBeInTheDocument()
  })
})
