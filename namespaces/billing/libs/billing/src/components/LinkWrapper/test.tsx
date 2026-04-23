import React, { ComponentProps, ReactNode } from 'react'

import LinkWrapper from '.'
import renderComponent from '../../utils/tests'

const render = (
  children: ReactNode,
  props: ComponentProps<typeof LinkWrapper> = {}
) => renderComponent(<LinkWrapper {...props}>{children}</LinkWrapper>)

describe('LinkWrapper', () => {
  describe('when `href` defined', () => {
    it(`renders link properly`, () => {
      const { queryByTestId } = render(<span>Test</span>, {
        href: 'https://some.url'
      })

      expect(queryByTestId('LinkWrapper-link')).toContainHTML(
        'href="https://some.url"'
      )
      expect(queryByTestId('LinkWrapper-link')).toContainHTML('Test')
    })
  })

  describe('when `href` is undefined', () => {
    it(`renders children properly`, () => {
      const { queryByTestId } = render(<span data-testid='example'>Test</span>)

      expect(queryByTestId('LinkWrapper-link')).toBeNull()
      expect(queryByTestId('example')).toBeInTheDocument()
    })
  })
})
