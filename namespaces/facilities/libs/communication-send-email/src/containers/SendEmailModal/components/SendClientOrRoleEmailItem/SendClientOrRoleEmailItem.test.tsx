import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import SendClientOrRoleEmailItem from './SendClientOrRoleEmailItem'

jest.mock('@staff-portal/data-layer-service', () => ({
  ...jest.requireActual('@staff-portal/data-layer-service'),
  useQuery: jest.fn()
}))

jest.mock('../../hooks/use-send-email-modal', () => ({
  useSendEmailModal: () => ({
    showModal: () => {}
  })
}))

const useQueryMock = useQuery as jest.Mock

const ROLE_OR_CLIENT_ID = '1'

const arrangeTest = (operationCallable?: OperationCallableTypes) => {
  useQueryMock.mockReturnValue({
    data: {
      staffNode: {
        emailMessaging: {
          operations: {
            sendEmailTo: {
              messages: [],
              callable: operationCallable || OperationCallableTypes.ENABLED
            }
          }
        }
      }
    },
    loading: false
  })

  return render(
    <TestWrapper>
      <SendClientOrRoleEmailItem
        roleOrClientId={ROLE_OR_CLIENT_ID}
        entityType={'clients'}
      />
    </TestWrapper>
  )
}

describe('SendClientOrRoleEmailItem', () => {
  it('renders button if operation enabled', () => {
    arrangeTest()

    expect(
      screen.getByTestId('send-client-or-role-email-item')
    ).toBeInTheDocument()
  })

  it('not renders button if operation hidden', async () => {
    arrangeTest(OperationCallableTypes.HIDDEN)

    expect(screen.queryByTestId('send-client-or-role-email-item')).toBeNull()
  })
})
