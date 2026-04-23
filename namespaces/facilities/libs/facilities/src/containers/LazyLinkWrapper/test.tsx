import { fireEvent, render, screen, within } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { UrlWithMessages } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import LazyLinkWrapper from './LazyLinkWrapper'

const buildLink = (link?: Partial<UrlWithMessages>) => ({
  enabled: true,
  messages: [],
  url: 'https://toptal.com',
  ...link
})

const children = <div data-testid='LazyLinkWrapper-child' />

const arrangeTest = (props: ComponentProps<typeof LazyLinkWrapper>) =>
  render(
    <TestWrapper>
      <LazyLinkWrapper {...props} />
    </TestWrapper>
  )

describe('LazyLinkWrapper', () => {
  describe('when the link is missing', () => {
    it('returns null', () => {
      arrangeTest({ children })

      expect(
        screen.queryByTestId('LazyLinkWrapper-child')
      ).not.toBeInTheDocument()
    })
  })

  describe('when passing hidden', () => {
    it('returns null', () => {
      arrangeTest({ children, hidden: true })

      expect(
        screen.queryByTestId('LazyLinkWrapper-child')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there is no tooltip', () => {
    it('shows only children', () => {
      arrangeTest({ children, link: buildLink() })

      expect(screen.getByTestId('LazyLinkWrapper-child')).toBeInTheDocument()
      expect(
        screen.queryByTestId('LazyLinkWrapper-content')
      ).not.toBeInTheDocument()
    })
  })

  describe('when passing disable tooltip', () => {
    it('shows only children', () => {
      arrangeTest({
        children,
        disableTooltip: true,
        link: buildLink({ messages: ['Hello world'] })
      })

      expect(screen.getByTestId('LazyLinkWrapper-child')).toBeInTheDocument()
      expect(
        screen.queryByTestId('LazyLinkWrapper-content')
      ).not.toBeInTheDocument()
    })
  })

  describe('when url is missing', () => {
    describe('when receiving only one message', () => {
      it('shows the message', async () => {
        arrangeTest({
          children,
          link: buildLink({ messages: ['Hello world'], url: undefined })
        })

        fireEvent.mouseOver(screen.getByTestId('LazyLinkWrapper-content'))

        expect(
          within(await screen.findByRole('tooltip')).getByText('Hello world')
        ).toBeInTheDocument()
      })
    })

    describe('when receiving multiple messages', () => {
      it('shows messages', async () => {
        arrangeTest({
          children,
          link: buildLink({
            messages: ['Hello world', 'Hello Toptal'],
            url: undefined
          })
        })

        fireEvent.mouseOver(screen.getByTestId('LazyLinkWrapper-content'))

        expect(
          within(await screen.findByRole('tooltip')).getByText('Hello world')
        ).toBeInTheDocument()

        expect(
          within(screen.getByRole('tooltip')).getByText('Hello Toptal')
        ).toBeInTheDocument()
      })
    })
  })
})
