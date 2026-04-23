import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import WidgetStaffJobPage from '.'
import JobPage from '../../modules/job/pages/JobPage'

const mockJobPage = JobPage as jest.Mock

jest.mock('@staff-portal/billing/src/components/App')
jest.mock('../../modules/job/pages/JobPage')
jest.mock('@staff-portal/billing/src/components/Modals')

const render = (props: ComponentProps<typeof WidgetStaffJobPage>) =>
  renderComponent(<WidgetStaffJobPage {...props} />)

describe('WidgetStaffJobPage', () => {
  describe('when `modalsOnly` is `undefined`', () => {
    it('renders all required components', () => {
      const { getByTestId } = render({
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
        endpoints: fixtures.MockEndpoints
      })

      expect(getByTestId('App')).toBeInTheDocument()
      expect(getByTestId('JobPage')).toBeInTheDocument()
      expect(getByTestId('Modals')).toBeInTheDocument()
    })
  })

  describe('when `modalsOnly` is `true`', () => {
    it('null being rendered', () => {
      const { queryByTestId, getByTestId } = render({
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
        modalsOnly: true,
        endpoints: fixtures.MockEndpoints
      })

      expect(getByTestId('App')).toBeInTheDocument()
      expect(queryByTestId('JobPage')).toBeNull()
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

      mockJobPage.mockImplementation(LocalFailingComponent)

      const { queryByTestId } = render({
        engagementId: 'VjEtRW5nYWdlbWVudC0xNzE2MDg',
        renderAppShell: true,
        endpoints: fixtures.MockEndpoints
      })

      expect(queryByTestId('JobPage')).toBeNull()
    })
  })
})
