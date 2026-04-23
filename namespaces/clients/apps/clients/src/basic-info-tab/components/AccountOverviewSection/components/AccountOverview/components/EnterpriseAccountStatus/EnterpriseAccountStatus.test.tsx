import React, { ComponentProps } from 'react'
import { render as renderComponent } from '@testing-library/react'
import {
  ClientEnterpriseAccountStatusEnum,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import EnterpriseAccountStatus from './EnterpriseAccountStatus'
import {
  EnterpriseAccountStatusRestore,
  EnterpriseAccountStatusUpdate
} from './components'

jest.mock('./components', () => ({
  EnterpriseAccountStatusRestore: jest.fn(),
  EnterpriseAccountStatusUpdate: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof EnterpriseAccountStatus>) =>
  renderComponent(
    <TestWrapper>
      <EnterpriseAccountStatus {...props} />
    </TestWrapper>
  )

const mockedEnterpriseAccountStatusRestore =
  EnterpriseAccountStatusRestore as jest.Mock
const mockedEnterpriseAccountStatusUpdate =
  EnterpriseAccountStatusUpdate as jest.Mock

describe('EnterpriseAccountStatus', () => {
  beforeEach(() => {
    mockedEnterpriseAccountStatusRestore.mockReturnValueOnce(null)
    mockedEnterpriseAccountStatusUpdate.mockReturnValueOnce(null)
  })

  describe('when restore is enabled and update hidden', () => {
    it('renders EnterpriseAccountStatusRestore', () => {
      const updateClientEnterpriseAccountStatus = {
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      }
      const restoreClientEnterpriseAccountStatus = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
      const clientId = 'id'
      const status = ClientEnterpriseAccountStatusEnum.ACTIVE

      arrangeTest({
        clientId,
        enterpriseAccountStatus: {
          status
        },
        restoreClientEnterpriseAccountStatus,
        updateClientEnterpriseAccountStatus
      })

      expect(mockedEnterpriseAccountStatusRestore).toHaveBeenCalledTimes(1)
      expect(mockedEnterpriseAccountStatusRestore).toHaveBeenCalledWith(
        {
          operation: restoreClientEnterpriseAccountStatus,
          status,
          clientId
        },
        {}
      )
      expect(mockedEnterpriseAccountStatusUpdate).toHaveBeenCalledTimes(0)
    })
  })

  describe('when update is enabled and restore hidden', () => {
    it('renders EnterpriseAccountStatusUpdate', () => {
      const updateClientEnterpriseAccountStatus = {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
      const restoreClientEnterpriseAccountStatus = {
        callable: OperationCallableTypes.HIDDEN,
        messages: []
      }
      const clientId = 'id'
      const status = ClientEnterpriseAccountStatusEnum.ACTIVE

      arrangeTest({
        clientId,
        enterpriseAccountStatus: {
          status
        },
        restoreClientEnterpriseAccountStatus,
        updateClientEnterpriseAccountStatus
      })

      expect(mockedEnterpriseAccountStatusUpdate).toHaveBeenCalledTimes(1)
      expect(mockedEnterpriseAccountStatusUpdate).toHaveBeenCalledWith(
        {
          operation: updateClientEnterpriseAccountStatus,
          status,
          clientId
        },
        {}
      )
      expect(mockedEnterpriseAccountStatusRestore).toHaveBeenCalledTimes(0)
    })
  })
})
