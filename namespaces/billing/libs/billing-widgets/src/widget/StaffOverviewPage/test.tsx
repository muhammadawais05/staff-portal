import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import WidgetStaffOverviewPage from '.'
import StaffOverviewPage from '../../components/StaffOverviewPage'

const mockStaffOverviewPage = StaffOverviewPage as jest.Mock

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../components/StaffOverviewPage')

const render = (props?: ComponentProps<typeof WidgetStaffOverviewPage>) =>
  renderComponent(<WidgetStaffOverviewPage {...props} />)

describe('WidgetStaffOverviewPage', () => {
  it('renders all required components', () => {
    const { getByTestId } = render()

    expect(getByTestId('App')).toBeInTheDocument()
    expect(getByTestId('StaffOverviewPage')).toBeInTheDocument()
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

      mockStaffOverviewPage.mockImplementation(LocalFailingComponent)

      const { queryByTestId } = render({
        baseAppProps: {
          renderAppShell: true,
          endpoints: fixtures.MockEndpoints
        }
      })

      expect(queryByTestId('StaffOverviewPage')).toBeNull()
    })
  })
})
