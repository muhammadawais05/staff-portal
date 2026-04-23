import { render } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { useDependency } from '@staff-portal/dependency-injector'
import { when } from 'jest-when'

import { RECENT_ACTIVITY_BUTTON } from '../../../../dependencies'
import BillingRecentActivityButton from '.'

jest.mock('@staff-portal/config', () => ({
  LEGACY_STAFF_PORTAL_URL: 'LEGACY_STAFF_PORTAL_URL'
}))

jest.mock('@staff-portal/dependency-injector', () => ({
  ...jest.requireActual('@staff-portal/dependency-injector'),
  useDependency: jest.fn()
}))

const RecentActivityButtonMock = jest.fn()

when(useDependency as jest.Mock)
  .calledWith(RECENT_ACTIVITY_BUTTON)
  .mockReturnValue(RecentActivityButtonMock)

const arrangeTest = (
  props: ComponentProps<typeof BillingRecentActivityButton>
) => render(<BillingRecentActivityButton {...props} />)

describe('BillingRecentActivityButton', () => {
  it('renders with expected props', () => {
    RecentActivityButtonMock.mockImplementationOnce(({ children }) => children)
    arrangeTest({
      gid: 'gid/Payments/1234',
      type: 'invoices',
      content: 'History'
    })

    expect(RecentActivityButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        feeds: [['gid/Payments/1234']],
        fullHistoryUrl:
          'LEGACY_STAFF_PORTAL_URL/invoices/1234/performed_actions?comments=true',
        children: 'History'
      }),
      {}
    )
  })
})
