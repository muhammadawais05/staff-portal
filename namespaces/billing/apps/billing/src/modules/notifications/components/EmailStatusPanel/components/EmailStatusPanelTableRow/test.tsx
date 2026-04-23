import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import EmailStatusPanelTableRow from '.'

const mockedNotification = fixtures.MockNotifications.notifications.nodes[0]
const render = (props: ComponentProps<typeof EmailStatusPanelTableRow>) =>
  renderComponent(
    <Table>
      <Table.Body>
        <EmailStatusPanelTableRow {...props} />
      </Table.Body>
    </Table>
  )

describe('EmailStatusPanelTableRow', () => {
  describe('`isEven` is `true`', () => {
    it('has stripe class', () => {
      const { getByTestId } = render({
        notificationStatus: mockedNotification,
        isEven: true
      })

      expect(getByTestId('EmailStatusPanelTableRow').className).toMatch(
        'TableRow-stripeEven-'
      )
    })
  })

  describe('`isEven` is `false`', () => {
    it('has not stripe class', () => {
      const { getByTestId } = render({
        notificationStatus: mockedNotification,
        isEven: false
      })

      expect(getByTestId('EmailStatusPanelTableRow').className).not.toMatch(
        'TableRow-stripeEven-'
      )
    })
  })

  it('render information', () => {
    const { getByTestId } = render({
      notificationStatus: mockedNotification,
      isEven: false
    })

    expect(getByTestId('EmailStatusPanelTableRow-email').innerHTML).toBe(
      'anas-d7d4bb79a8c79b88@toptal.io'
    )
    expect(getByTestId('EmailStatusPanelTableRow-status').innerHTML).toBe(
      'Delivered'
    )
    expect(getByTestId('EmailStatusPanelTableRow-description').innerHTML).toBe(
      'Example delivered description'
    )
  })
})
