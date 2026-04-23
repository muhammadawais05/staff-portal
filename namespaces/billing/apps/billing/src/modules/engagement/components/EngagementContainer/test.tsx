import { noop } from '@toptal/picasso/utils'
import { useQuery } from '@apollo/client'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import { useExternalIntegratorContext } from '@staff-portal/billing/src/_lib/context/externalIntegratorContext'

import EngagementContainer from '.'

jest.mock('@apollo/client')
jest.mock('@staff-portal/billing/src/_lib/context/externalIntegratorContext')

const render = (props: ComponentProps<typeof EngagementContainer>) =>
  renderComponent(<EngagementContainer {...props} />)

describe('EngagementContainer', () => {
  describe('when data returned', () => {
    it('default render', () => {
      ;(useExternalIntegratorContext as jest.Mock).mockReturnValue({
        handleInboundEvent: noop,
        handleInboundEventUnsubscribe: noop
      })
      ;(useQuery as jest.Mock).mockReturnValue({
        data: {
          node: fixtures.MockEngagement
        },
        error: false,
        loading: false
      })
      const { queryByTestId } = render({
        children: <div data-testid='EngagementContainer-children'>test</div>,
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      expect(queryByTestId('EngagementContainer-children')).toBeInTheDocument()
    })
  })

  describe('when data is null', () => {
    it('render null', () => {
      ;(useExternalIntegratorContext as jest.Mock).mockReturnValue({
        handleInboundEvent: noop,
        handleInboundEventUnsubscribe: noop
      })
      ;(useQuery as jest.Mock).mockReturnValue({
        data: {
          node: null
        },
        error: false,
        loading: false
      })
      const { queryByTestId } = render({
        children: <div data-testid='EngagementContainer-children'>test</div>,
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      expect(
        queryByTestId('EngagementContainer-children')
      ).not.toBeInTheDocument()
    })
  })

  describe('when data is undefined', () => {
    it('render null', () => {
      ;(useExternalIntegratorContext as jest.Mock).mockReturnValue({
        handleInboundEvent: noop,
        handleInboundEventUnsubscribe: noop
      })
      ;(useQuery as jest.Mock).mockReturnValue({
        data: {
          node: undefined
        },
        error: false,
        loading: false
      })
      const { queryByTestId } = render({
        children: <div data-testid='EngagementContainer-children'>test</div>,
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      expect(
        queryByTestId('EngagementContainer-children')
      ).not.toBeInTheDocument()
    })
  })
})
