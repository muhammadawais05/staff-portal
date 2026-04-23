import React from 'react'
import {
  render,
  screen,
  waitForElementToBeRemoved
} from '@toptal/picasso/test-utils'
import { MemoryRouter } from '@staff-portal/navigation'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EditSourcingRequest from '.'
import { useGetSourcingRequestIdParam } from './hooks'
import { createGetSourcingRequestDataMock } from './data/get-sourcing-request-data/mocks'

jest.mock('./hooks/use-get-sourcing-request-id-param')

const useGetSourcingRequestIdParamMock =
  useGetSourcingRequestIdParam as jest.Mock

const ENCODED_SOURCING_REQUEST_ID = 'encoded-sourcing-request-id-123'

const job = {
  id: '123',
  title: 'Principal Developer (123)',
  webResource: {
    __typename: 'Link',
    text: 'Principal Developer (123)',
    url: 'http://localhost:3000/platform/staff/jobs/123'
  },
  client: {
    id: '1',
    enterprise: false,
    __typename: 'Client'
  },
  __typename: 'Job'
}

const arrangeTest = async ({
  mocks,
  waitForLoader
}: {
  mocks?: MockedResponse[]
  waitForLoader?: boolean
}) => {
  render(
    <MemoryRouter>
      <TestWrapperWithMocks mocks={mocks}>
        <EditSourcingRequest />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )

  if (waitForLoader) {
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('EditSourcingRequest-PageLoader')
    )
  }
}

const mockOperations = (callable: OperationCallableTypes) => ({
  updateSourcingRequest: {
    callable,
    messages: [],
    __typename: 'Operation'
  },
  __typename: 'QueryOperations'
})

describe('EditSourcingRequest', () => {
  beforeEach(() => {
    useGetSourcingRequestIdParamMock.mockReturnValue(
      ENCODED_SOURCING_REQUEST_ID
    )
  })

  it('renders PageLoader when loading data', async () => {
    const mocks = [
      createGetSourcingRequestDataMock({
        encodedId: ENCODED_SOURCING_REQUEST_ID,
        loading: true
      })
    ]

    await arrangeTest({ mocks })

    expect(screen.getByText('Loading, please wait…')).toBeInTheDocument()
  })

  it('renders error when the user does not have permission', async () => {
    const mocks = [
      createGetSourcingRequestDataMock({
        encodedId: ENCODED_SOURCING_REQUEST_ID,
        data: {
          operations: mockOperations(OperationCallableTypes.HIDDEN)
        }
      })
    ]

    await arrangeTest({ mocks, waitForLoader: true })

    expect(
      screen.getByText('This operation cannot be performed at this moment.')
    ).toBeInTheDocument()
  })

  it('renders page title with job link', async () => {
    const mocks = [
      createGetSourcingRequestDataMock({
        encodedId: ENCODED_SOURCING_REQUEST_ID,
        data: {
          job,
          operations: mockOperations(OperationCallableTypes.ENABLED)
        }
      })
    ]

    await arrangeTest({ mocks, waitForLoader: true })

    expect(screen.queryByText('Loading, please wait…')).not.toBeInTheDocument()

    const titleNode = screen.getByText(/Edit Sourcing Request for job/)

    expect(titleNode?.textContent?.trim()).toBe(
      `Edit Sourcing Request for job ${job.title}`
    )
    expect(titleNode?.getElementsByTagName('A')[0]).toHaveAttribute(
      'href',
      job.webResource.url
    )
  })
})
