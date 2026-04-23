import React, { ComponentProps } from 'react'
import fixtures from '@staff-portal/billing/src/_fixtures'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import { useGetNotification } from '../../data'
import EmailStatusPanel from '.'

jest.mock('../EmailStatusPanelContent')
jest.mock('../../data')
jest.mock('@staff-portal/billing/src/components/TableSkeleton')
jest.mock('../EmailStatusPanelHeader')

const render = (props: ComponentProps<typeof EmailStatusPanel>) =>
  renderComponent(<EmailStatusPanel {...props} />)

describe('EmailStatusPanel', () => {
  beforeEach(() => {
    ;(useGetNotification as jest.Mock).mockReturnValue({
      data: {
        id: fixtures.MockInvoice.id,
        notifications: fixtures.MockNotifications
      }
    })
  })

  it('card is rendered properly', () => {
    const { getByTestId } = render({
      nodeId: fixtures.MockInvoice.id
    })

    expect(getByTestId('EmailStatusPanel-title')).toContainHTML('Email Status')
    expect(getByTestId('EmailStatusPanelContent')).toBeInTheDocument()
  })
})
