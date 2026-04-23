import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EngagementsTableRowIcon from '.'

const render = (props: ComponentProps<typeof EngagementsTableRowIcon>) =>
  renderComponent(<EngagementsTableRowIcon {...props} />)

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Tooltip: jest.fn().mockImplementation(({ children, content }) => (
    <div data-testid='Tooltip'>
      <div data-testid='Tooltip-content'>{content}</div>
      <div data-testid='Tooltip-children'>{children}</div>
    </div>
  ))
}))

describe('EngagementsTableRowIcon', () => {
  it('default render', () => {
    const { queryByTestId } = render({
      webResource: { text: 'LINK TEXT', url: 'URL' },
      isWorking: true
    })

    const content = queryByTestId('Tooltip-content')

    expect(content).toContainHTML('This engagement already belongs to ')
    expect(content).toContainHTML('and cannot be selected.')
    expect(queryByTestId(`EngagementsTableRowIcon-icon`)).toBeInTheDocument()
  })
})
