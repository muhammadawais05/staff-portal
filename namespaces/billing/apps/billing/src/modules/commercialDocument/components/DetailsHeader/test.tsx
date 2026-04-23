import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import DetailsHeader from '.'

const render = (props: ComponentProps<typeof DetailsHeader>) =>
  renderComponent(<DetailsHeader {...props} />)

describe('DetailsHeader', () => {
  describe('when renderRecentActivityButton is not provided', () => {
    it('not renders `HistoryWidget`', () => {
      const gid = 'exampleGID'
      const { queryByTestId } = render({
        gid,
        type: 'invoices'
      })

      expect(queryByTestId('RecentActivityButton-container')).toBeNull()
    })
  })

  describe('when has more actions', () => {
    it('renders `MoreActions`', () => {
      const gid = 'exampleGID'
      const { getByTestId } = render({
        gid,
        MoreActions: <div data-testid='MoreActions' />,
        type: 'payments'
      })

      expect(getByTestId('DetailsHeader-more-actions')).toBeInTheDocument()
      expect(
        getByTestId('DetailsHeader-more-actions-button')
      ).toBeInTheDocument()
      expect(getByTestId('DetailsHeader-more-actions-button')).toContainHTML(
        'More'
      )
    })
  })

  describe('when no more actions', () => {
    it('renders without `MoreActions`', () => {
      const gid = 'exampleGID'
      const { queryByTestId } = render({
        gid,
        MoreActions: null,
        type: 'payments'
      })

      expect(
        queryByTestId('DetailsHeader-more-actions')
      ).not.toBeInTheDocument()
      expect(
        queryByTestId('DetailsHeader-more-actions-button')
      ).not.toBeInTheDocument()
    })
  })
})
