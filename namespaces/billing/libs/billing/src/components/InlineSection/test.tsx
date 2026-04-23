import React, { ComponentProps } from 'react'
import { fireEvent } from '@toptal/picasso/test-utils'

import InlineSection from '.'
import renderComponent from '../../utils/tests'
import { formElementProps } from './InlineSection'

const render = (props: ComponentProps<typeof InlineSection>) =>
  renderComponent(<InlineSection {...props} />)

const formElement = (data: formElementProps) => {
  return (
    <div
      data-testid={data.isOpenForm ? 'MyForm-opened' : 'MyForm-closed'}
    ></div>
  )
}

describe('InlineSection', () => {
  const displayName = 'InlineSection'

  it('default render', () => {
    const showRevealButton = false
    const { getByTestId, queryByTestId } = render({
      headerTitle: 'Inline Section',
      revealText: 'Show Form',
      formElement,
      showRevealButton,
      'data-testid': displayName
    })

    expect(getByTestId(`${displayName}-title`)).toHaveTextContent(
      /Inline Section/i
    )

    expect(queryByTestId('edit')).not.toBeInTheDocument()
    expect(getByTestId('MyForm-closed')).toBeInTheDocument()
  })

  it('should render reveal button & open form', () => {
    const showRevealButton = true
    const { getByTestId, queryByTestId } = render({
      headerTitle: 'Inline Section',
      revealText: 'Show Form',
      formElement,
      showRevealButton,
      'data-testid': displayName
    })

    expect(queryByTestId('edit')).toHaveTextContent(/Show Form/i)
    fireEvent.click(getByTestId('edit'))
    expect(getByTestId('MyForm-opened')).toBeInTheDocument()
  })
})
