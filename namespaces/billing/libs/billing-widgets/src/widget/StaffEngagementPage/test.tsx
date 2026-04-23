import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import WidgetStaffEngagementPage from '.'
import EngagementPage from '../../modules/engagement/pages/EngagementPage'

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/engagement/pages/EngagementPage')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')

const mockEngagementPage = EngagementPage as jest.Mock

const render = (props?: ComponentProps<typeof WidgetStaffEngagementPage>) =>
  renderComponent(<WidgetStaffEngagementPage {...props} />)

describe('WidgetStaffEngagementPage', () => {
  describe('when `engagementGid` is defined', () => {
    it('renders all required components', () => {
      const { getByTestId } = render({
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg'
      })

      expect(getByTestId('App')).toBeInTheDocument()
      expect(getByTestId('EngagementPage')).toBeInTheDocument()
      expect(getByTestId('Modals')).toBeInTheDocument()
    })
  })

  describe('when `engagementGid` is `undefined`', () => {
    it('renders `null`', () => {
      const { queryByTestId } = render()

      expect(queryByTestId('App')).toBeNull()
      expect(queryByTestId('EngagementPage')).toBeNull()
      expect(queryByTestId('Modals')).toBeNull()
    })
  })

  describe('when error is caught', () => {
    let spyConsole: jest.SpyInstance

    beforeEach(() => {
      spyConsole = jest.spyOn(console, 'error').mockImplementation(() => {})
    })

    afterEach(() => {
      spyConsole.mockRestore()
    })

    it('displays nothing', () => {
      const COMPONENT_ERROR_TEXT = 'Error occurred'
      const LocalFailingComponent = () => {
        throw new Error(COMPONENT_ERROR_TEXT)
      }

      mockEngagementPage.mockImplementation(LocalFailingComponent)

      const { queryByTestId } = render({
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
        baseAppProps: {
          renderAppShell: true,
          endpoints: fixtures.MockEndpoints
        }
      })

      expect(queryByTestId('EngagementPage')).toBeNull()
    })
  })
})
