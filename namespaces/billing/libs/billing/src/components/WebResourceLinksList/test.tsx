import React, { ComponentProps } from 'react'

import WebResourceLinksList from '.'
import renderComponent from '../../utils/tests'

const render = (props: ComponentProps<typeof WebResourceLinksList>) =>
  renderComponent(<WebResourceLinksList {...props} />)

describe('WebResourceLinksList', () => {
  it('renders a list of Links', () => {
    const { getByTestId } = render({
      webResources: [
        {
          webResource: {
            url: 'http://example.com',
            text: 'Example Link'
          }
        },
        {
          id: '123',
          webResource: {
            url: 'http://example.com',
            text: 'Example Link with an ID'
          }
        },
        {
          webResource: {
            url: undefined,
            text: 'Example Link without an url'
          }
        }
      ]
    })
    const item0 = getByTestId('WebResourceLinksList-0')
    const item1 = getByTestId('WebResourceLinksList-1')
    const item2 = getByTestId('WebResourceLinksList-2')

    expect(item0?.tagName).toBe('A')
    expect(item0).toHaveAttribute('href', 'http://example.com')
    expect(item0).toHaveTextContent('Example Link')

    expect(item1?.tagName).toBe('A')
    expect(item1).toHaveAttribute('href', 'http://example.com')
    expect(item1).toHaveTextContent('Example Link with an ID')

    expect(item2?.tagName).toBe('SPAN')
    expect(item2).toHaveTextContent('Example Link without an url')
  })
})
