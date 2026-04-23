import React, { ReactNode } from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { waitFor } from '@testing-library/react'
import {
  EmailMessageOrderFieldEnum,
  OrderDirectionEnum
} from '@staff-portal/graphql/lens'
import {
  MockedProvider,
  encodeEntityId
} from '@staff-portal/data-layer-service'
import { SortOrder } from '@staff-portal/filters'

import { createGetEmailMessagesListMock } from './mocks'
import { useGetLazyEmailMessagesList } from './get-email-messages-list.lens.gql'

type MockedProviderWrapper = {
  children?: ReactNode
}

describe('useGetLazyEmailMessagesList', () => {
  it('searches for all the client and non-client emails retrieved from badges', async () => {
    const CLIENT_REPRESENTATIVE_EMAIL_1 = 'test11@example.com'
    const CLIENT_REPRESENTATIVE_EMAIL_2 = 'test12@example.com'
    const CLIENT_REPRESENTATIVE_EMAIL_3 = 'test13@example.com'

    const NON_CLIENT_EMAIL_1 = 'test14@example.com'
    const NON_CLIENT_EMAIL_2 = 'test15@example.com'

    const mocks = [
      createGetEmailMessagesListMock({
        badges: {
          userEmails: [
            [CLIENT_REPRESENTATIVE_EMAIL_1],
            [CLIENT_REPRESENTATIVE_EMAIL_2, CLIENT_REPRESENTATIVE_EMAIL_3],
            [NON_CLIENT_EMAIL_1, NON_CLIENT_EMAIL_2]
          ]
        },
        pageSize: 1,
        order: {
          direction: OrderDirectionEnum.ASC,
          field: EmailMessageOrderFieldEnum.SENT_AT
        }
      })
    ]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children as React.ReactElement}
      </MockedProvider>
    )

    const autocompleteClientFragment = {
      id: encodeEntityId('123', 'Client'),
      userLegacyId: 1,
      type: 'Client',
      email: 'test@example.com',
      fullName: 'Test Client Name',
      representatives: {
        nodes: [
          {
            id: 'test-id',
            contacts: {
              nodes: [
                {
                  id: 'test-id',
                  value: CLIENT_REPRESENTATIVE_EMAIL_1
                }
              ]
            }
          },
          {
            id: 'test-id',
            contacts: {
              nodes: [
                {
                  id: 'test-id',
                  value: CLIENT_REPRESENTATIVE_EMAIL_2
                },
                {
                  id: 'test-id',
                  value: CLIENT_REPRESENTATIVE_EMAIL_3
                }
              ]
            }
          }
        ]
      }
    }

    const autocompleteNonClientFragment = {
      id: encodeEntityId('123', 'Staff'),
      userLegacyId: 1,
      type: 'Non-client',
      email: 'test@example.com',
      fullName: 'Test Non-client Name',
      contacts: {
        nodes: [
          {
            id: 'test-id',
            value: NON_CLIENT_EMAIL_1
          },
          {
            id: 'test-id',
            value: NON_CLIENT_EMAIL_2
          }
        ]
      }
    }

    const filterValues = {
      badges: {
        user_ids: [autocompleteClientFragment, autocompleteNonClientFragment]
      },
      sort: { order: SortOrder.ASC, target: 'sent_at' },
      pageSize: 1
    }

    const { result, waitForNextUpdate } = renderHook(
      () => useGetLazyEmailMessagesList(),
      { wrapper }
    )

    await act(async () => {
      result.current.getEmailMessages(filterValues)
      await waitForNextUpdate()
      await waitFor(() => {
        expect(result.current.data?.emailMessages.entities.length).toBe(1)
      })
    })
  })
})
