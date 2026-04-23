import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ViewBillingOptionsContainer from '../../containers/ViewBillingOptionsContainer'
import WidgetStaffConsolidationDefaultsPage from '.'
import ConsolidationDefaultsPage from '../../modules/billingDetails/pages/ConsolidationDefaultsPage'

const mockConsolidationDefaultsPage = ConsolidationDefaultsPage as jest.Mock

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/billingDetails/pages/ConsolidationDefaultsPage')
jest.mock('@staff-portal/billing/src/components/Modals')
jest.mock('@staff-portal/billing/src/utils')
jest.mock('../../containers/ViewBillingOptionsContainer', () => ({
  __esModule: true,
  default: jest.fn()
}))

const render = (
  props: ComponentProps<typeof WidgetStaffConsolidationDefaultsPage>
) => renderComponent(<WidgetStaffConsolidationDefaultsPage {...props} />)

const mockedViewBillingOptionsContainer =
  ViewBillingOptionsContainer as jest.Mock

mockedViewBillingOptionsContainer.mockImplementation(({ children }) => children)

describe('WidgetStaffConsolidationDefaultsPage', () => {
  describe('when `modalsOnly` is `undefined`', () => {
    it('renders all required components', () => {
      const { getByTestId } = render({
        clientId: 'VjEtQ2xpZW50LTM3OTU4NA'
      })

      expect(getByTestId('App')).toBeInTheDocument()
      expect(getByTestId('ConsolidationDefaultsPage')).toBeInTheDocument()
      expect(getByTestId('Modals')).toBeInTheDocument()

      expect(mockedViewBillingOptionsContainer).toHaveBeenCalledTimes(1)
      expect(mockedViewBillingOptionsContainer).toHaveBeenCalledWith(
        expect.objectContaining({
          skeletonRowsSize: 6
        }),
        {}
      )
    })
  })

  describe('when `modalsOnly` is `true`', () => {
    it('null being rendered', () => {
      const { queryByTestId, getByTestId } = render({
        clientId: 'VjEtQ2xpZW50LTM3OTU4NA',
        modalsOnly: true
      })

      expect(getByTestId('App')).toBeInTheDocument()
      expect(queryByTestId('ConsolidationDefaultsPage')).toBeNull()
      expect(getByTestId('Modals')).toBeInTheDocument()
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

      mockConsolidationDefaultsPage.mockImplementation(LocalFailingComponent)

      const { queryByTestId } = render({
        clientId: 'VjEtQ2xpZW50LTM3OTU4NA',
        baseAppProps: {
          renderAppShell: true,
          endpoints: fixtures.MockEndpoints
        }
      })

      expect(queryByTestId('ConsolidationDefaultsPage')).toBeNull()
    })
  })
})
