import React, { ComponentProps } from 'react'

import WebResourceLinkWrapper from '.'
import renderComponent from '../../utils/tests'

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  TypographyOverflow: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='TypographyOverflow'>{children}</div>
    )),
  Typography: jest
    .fn()
    .mockImplementation(({ children }) => (
      <div data-testid='Typography'>{children}</div>
    )),
  Link: jest.fn().mockImplementation(({ children, href, target }) => (
    <a data-testid='Link' href={href} target={target}>
      {children}
    </a>
  ))
}))

const render = (props: ComponentProps<typeof WebResourceLinkWrapper>) =>
  renderComponent(<WebResourceLinkWrapper {...props} />)

describe('WebResourceLinkWrapper', () => {
  describe.each([
    {
      webResource: {
        url: 'example.com',
        text: 'example link'
      }
    },
    {
      webResource: {
        url: 'example.com',
        text: 'example link'
      },
      isTextOverflowEnabled: true
    },
    {
      webResource: {
        url: 'example.com',
        text: 'example link'
      },
      inline: true
    },
    {
      webResource: {
        url: 'example.com'
      },
      defaultText: 'example default'
    }
  ])('has web resource', props => {
    const { webResource, isTextOverflowEnabled, inline, defaultText } = props

    describe(`when webResource is ${JSON.stringify(webResource)}`, () => {
      // eslint-disable-next-line
      const testCase =
        (isTextOverflowEnabled && 'with `isTextOverflowEnabled`') ||
        (inline && 'with `inline`') ||
        (defaultText && 'with `defaultText`') ||
        ''

      it(`renders ${testCase}`, () => {
        const { queryByTestId } = render(
          props as ComponentProps<typeof WebResourceLinkWrapper>
        )

        const text = defaultText || (webResource?.text as string)
        const container = queryByTestId(
          isTextOverflowEnabled ? 'TypographyOverflow' : 'Typography'
        )

        expect(container).toBeInTheDocument()
        expect(container).toContainHTML(text)
      })
    })
  })

  describe.each([
    {
      webResource: {
        url: 'example.com'
      }
    },
    { isTextOverflowEnabled: true },
    { isTextOverflowEnabled: false }
  ])('no web resource', props => {
    const { isTextOverflowEnabled } = props

    it(`renders ${isTextOverflowEnabled}`, () => {
      const { queryByTestId } = render(
        props as ComponentProps<typeof WebResourceLinkWrapper>
      )

      const container = queryByTestId(
        isTextOverflowEnabled ? 'TypographyOverflow' : 'Typography'
      )

      expect(container).not.toBeInTheDocument()
    })
  })

  it('should add target attribute', () => {
    const { queryByTestId } = render({
      webResource: {
        url: 'example.com',
        text: 'example link'
      },
      target: '_blank'
    })

    expect(queryByTestId('Link')).toHaveAttribute('target', '_blank')
  })
})
