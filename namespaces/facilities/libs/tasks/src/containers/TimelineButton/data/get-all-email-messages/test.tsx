import React, { ReactNode } from 'react'
import { renderHook } from '@testing-library/react-hooks'
import { MockedProvider } from '@staff-portal/data-layer-service'

import { createGetEmailMessagesListMock } from './mocks'
import { useGetAllEmailMessages } from './get-all-email-messages.lens.gql'

type MockedProviderWrapper = {
  children?: ReactNode
}

const EMAIL_ADDRESS = 'tyler.durden@gmail.com'
const PAGE_SIZE = 100

const defaultEmail = {
  id: 'abc123',
  body: 'email body cv2',
  subject: 'email subject cv2',
  fromEmail: 'acjd7e@example.com',
  toEmail: 'acy5aq@example.com'
}

describe('useGetAllEmailMessages', () => {
  it('returns the same references of the result objects if called twice', async () => {
    const mocks = [
      createGetEmailMessagesListMock(
        [
          {
            ...defaultEmail,
            fromEmail: EMAIL_ADDRESS,
            toEmail: EMAIL_ADDRESS
          }
        ],
        { badges: { userEmails: [[EMAIL_ADDRESS]] }, pageSize: PAGE_SIZE }
      )
    ]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={{
          watchQuery: { fetchPolicy: 'no-cache' },
          query: { fetchPolicy: 'no-cache' }
        }}
      >
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hookProps = {
      filterValues: EMAIL_ADDRESS
    }

    const hook = renderHook(
      props => useGetAllEmailMessages(props.filterValues),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.loading).toBe(true)
    await hook.waitForValueToChange(() => hook.result.current.loading === false)

    const prevResult = hook.result.current

    // after re-render of the hook
    hook.rerender(hookProps)

    // we need to have exactly the same results
    expect(hook.result.current.data).toBeDefined()
    expect(prevResult.data).toBe(hook.result.current.data)
  })

  it('returns all records available', async () => {
    const totalRecordsCount = 2
    const emailOneId = '1'
    const emailTwoId = '2'
    const mocks = [
      createGetEmailMessagesListMock(
        [
          {
            ...defaultEmail,
            fromEmail: EMAIL_ADDRESS,
            toEmail: EMAIL_ADDRESS,
            id: emailOneId
          }
        ],
        { badges: { userEmails: [[EMAIL_ADDRESS]] }, pageSize: PAGE_SIZE },
        totalRecordsCount
      ),
      createGetEmailMessagesListMock(
        [
          {
            ...defaultEmail,
            fromEmail: EMAIL_ADDRESS,
            toEmail: EMAIL_ADDRESS,
            id: emailTwoId
          }
        ],
        {
          badges: { userEmails: [[EMAIL_ADDRESS]] },
          pageSize: PAGE_SIZE,
          page: 2
        },
        totalRecordsCount
      )
    ]
    const wrapper = ({ children }: MockedProviderWrapper) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children as React.ReactElement}
      </MockedProvider>
    )

    const hookProps = {
      filterValues: EMAIL_ADDRESS
    }

    const hook = renderHook(
      props => useGetAllEmailMessages(props.filterValues),
      {
        wrapper,
        initialProps: hookProps
      }
    )

    expect(hook.result.current.loading).toBe(true)
    await hook.waitFor(
      () =>
        hook.result.current.loading === false &&
        Boolean(hook.result.current.data?.emailMessages.entities[1])
    )
    expect(hook.result.current.error).toBeUndefined()
    expect(hook.result.current.data?.emailMessages.entities).toHaveLength(
      totalRecordsCount
    )
    expect(hook.result.current.data?.emailMessages.entities[0].id).toBe(
      emailOneId
    )
    expect(hook.result.current.data?.emailMessages.entities[1].id).toBe(
      emailTwoId
    )
  })
})
