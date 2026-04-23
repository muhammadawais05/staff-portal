import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  useGetClientRoleIdParam,
  userCanViewCompanyPage
} from '@staff-portal/clients'
import { NodeStatusMessageNotifications } from '@staff-portal/status-messages'

import ClientProfile from './ClientProfile'
import { useGetClient } from '../../data/get-client'
import ClientProfileTabPanel from './components/ClientProfileTabPanel/ClientProfileTabPanel'
import ClientProfileTabsList from './components/ClientProfileTabsList/ClientProfileTabsList'

const mockUserCanViewCompanyPage = userCanViewCompanyPage as jest.Mock
const mockUseGetClientRoleIdParam = useGetClientRoleIdParam as jest.Mock
const mockUseGetClient = useGetClient as jest.Mock
const MockNodeStatusMessageNotifications =
  NodeStatusMessageNotifications as jest.Mock
const MockClientProfileTabPanel = ClientProfileTabPanel as jest.Mock
const MockClientProfileTabsList = ClientProfileTabsList as jest.Mock

jest.mock('@staff-portal/clients', () => ({
  ...jest.requireActual('@staff-portal/clients'),
  useGetClientRoleIdParam: jest.fn(),
  userCanViewCompanyPage: jest.fn()
}))
jest.mock('../../data/get-client', () => ({
  ...jest.requireActual('../../data/get-client'),
  useGetClient: jest.fn()
}))
jest.mock('@staff-portal/status-messages', () => ({
  NodeStatusMessageNotifications: jest.fn()
}))
jest.mock('./components/ClientProfileTabPanel/ClientProfileTabPanel', () => ({
  __esModule: true,
  default: jest.fn()
}))
jest.mock('./components/ClientProfileTabsList/ClientProfileTabsList', () => ({
  __esModule: true,
  default: jest.fn()
}))

const renderComponent = () =>
  render(
    <TestWrapper>
      <ClientProfile />
    </TestWrapper>
  )

describe('ClientProfile', () => {
  describe('when client is not provided', () => {
    it('default render', () => {
      const clientId = Symbol('clientId')
      const clientLegacyId = Symbol('clientLegacyId')

      mockUseGetClient.mockReturnValueOnce({
        client: null,
        loading: false,
        refetch: null
      })
      mockUseGetClientRoleIdParam.mockReturnValueOnce({
        clientId,
        clientLegacyId
      })
      mockUserCanViewCompanyPage.mockReturnValueOnce(true)
      MockNodeStatusMessageNotifications.mockReturnValueOnce(null)
      MockClientProfileTabPanel.mockReturnValueOnce(null)
      MockClientProfileTabsList.mockReturnValueOnce(null)

      renderComponent()

      expect(MockClientProfileTabsList).toHaveBeenCalledTimes(1)
    })
  })
})
