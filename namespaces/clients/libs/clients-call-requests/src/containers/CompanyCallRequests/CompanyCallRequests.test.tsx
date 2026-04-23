import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import {
  ContactType,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import CompanyCallRequests from './CompanyCallRequests'
import CompanyCallRequestListItemContent from './components/CompanyCallRequestListItemContent'
import CallRequestListItemActions from '../../components/CallRequestListItemActions'

jest.mock('./components/CompanyCallRequestListItemContent', () => jest.fn())
jest.mock('../../components/CallRequestListItemActions', () => jest.fn())

const renderComponent = (props: ComponentProps<typeof CompanyCallRequests>) =>
  render(
    <TestWrapper>
      <CompanyCallRequests {...props} />
    </TestWrapper>
  )

const mockedCallRequestListItemActions = CallRequestListItemActions as jest.Mock
const mockedCompanyCallRequestListItemContent =
  CompanyCallRequestListItemContent as jest.Mock
const operationMock = {
  __typename: 'Operation' as const,
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

describe('CompanyCallRequests', () => {
  describe('when no callback requests', () => {
    it('shows a message that no callback requests', () => {
      renderComponent({
        callbackRequests: []
      })

      expect(
        screen.getByTestId('CompanyCallRequests-empty-message').textContent
      ).toBe('Currently there are no call requests.')
      expect(screen.queryByTestId('CompanyCallRequests-container')).toBeNull()
    })
  })

  describe('when callback are available', () => {
    it('shows callbacks', () => {
      mockedCallRequestListItemActions.mockReturnValueOnce(null)
      mockedCompanyCallRequestListItemContent.mockReturnValueOnce(null)

      const name = 'test'
      const callbackRequest = {
        id: '',
        late: false,
        isNew: false,
        obscureLead: false,
        name,
        contacts: {
          nodes: [
            {
              id: '',
              type: ContactType.PHONE,
              value: ''
            }
          ]
        },
        operations: {
          __typename: 'CallbackRequestOperations' as const,
          claimCallbackRequest: operationMock,
          claimCallbackRequestWithClient: operationMock,
          removeCallbackRequest: operationMock
        },
        __typename: 'CallbackRequest' as const
      }

      renderComponent({
        callbackRequests: [callbackRequest]
      })

      expect(
        screen.queryByTestId('CompanyCallRequests-empty-message')
      ).not.toBeInTheDocument()
      expect(
        screen.getByTestId('CompanyCallRequests-container')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('CompanyCallRequests-item-name')
      ).toHaveTextContent(name)
      expect(mockedCallRequestListItemActions).toHaveBeenCalledTimes(1)
      expect(mockedCallRequestListItemActions).toHaveBeenCalledWith(
        {
          data: callbackRequest
        },
        {}
      )
      expect(mockedCompanyCallRequestListItemContent).toHaveBeenCalledTimes(1)
      expect(mockedCompanyCallRequestListItemContent).toHaveBeenCalledWith(
        {
          data: callbackRequest
        },
        {}
      )
    })
  })
})
