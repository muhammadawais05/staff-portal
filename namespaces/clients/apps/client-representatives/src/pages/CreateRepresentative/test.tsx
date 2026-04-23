import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { createMemoryHistory } from 'history'
import { Router, useParams, useQueryParams } from '@staff-portal/navigation'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { RepresentativeForm } from '@staff-portal/client-representatives'
import { getClientProfilePath, getJobPath } from '@staff-portal/routes'

import CreateCompanyRepresentative from './CreateRepresentative'
import { useGetClientForCreateRepresentative } from './data/get-client-for-create-representative'

jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useParams: jest.fn(),
  useQueryParams: jest.fn()
}))

jest.mock('@staff-portal/routes', () => ({
  getClientProfilePath: jest.fn(),
  getJobPath: jest.fn()
}))

const useParamsMock = useParams as jest.Mock
const useQueryParamsMock = useQueryParams as jest.Mock
const getClientProfilePathMock = getClientProfilePath as jest.Mock
const getJobPathMock = getJobPath as jest.Mock

jest.mock('./data/get-client-for-create-representative', () => ({
  useGetClientForCreateRepresentative: jest.fn()
}))

const mockUseGetClientForCreateRepresentative =
  useGetClientForCreateRepresentative as jest.Mock

jest.mock('@staff-portal/client-representatives', () => ({
  RepresentativeForm: jest.fn()
}))

const RepresentativeFormMock = RepresentativeForm as jest.Mock

const arrangeTest = () => {
  const history = createMemoryHistory({ initialEntries: ['testpath'] })

  render(
    <Router history={history}>
      <TestWrapperWithMocks>
        <CreateCompanyRepresentative />
      </TestWrapperWithMocks>
    </Router>
  )
}

const MOCK_CLIENT_ID = 'mock_client_id'

const ENCODED_MOCK_CLIENT_ID = encodeEntityId(MOCK_CLIENT_ID, 'Client')

const MOCK_JOB_ID = 'mock_JOB_id'

const ENCODED_MOCK_JOB_ID = encodeEntityId(MOCK_JOB_ID, 'Job')

const companyLink = `https://staff-portal/clients/${MOCK_CLIENT_ID}`
const jobLink = `https://staff-portal/jobs/${MOCK_JOB_ID}`

describe('CreateCompanyRepresentative', () => {
  beforeEach(() => {
    useParamsMock.mockReturnValue({ clientId: MOCK_CLIENT_ID })
    useQueryParamsMock.mockReturnValue([{ job_id: ENCODED_MOCK_JOB_ID }])

    RepresentativeFormMock.mockReturnValue(null)

    const mockedReturnValue: Partial<
      ReturnType<typeof useGetClientForCreateRepresentative>
    > = {
      client: {
        fullName: 'Best Company',
        id: 'client_id',
        companyLegacyId: 123
      }
    }

    getClientProfilePathMock.mockReturnValue(companyLink)
    getJobPathMock.mockReturnValue(jobLink)

    mockUseGetClientForCreateRepresentative.mockReturnValue(mockedReturnValue)
  })

  it('is fetching client with encoded ID passed in URL', () => {
    arrangeTest()

    expect(mockUseGetClientForCreateRepresentative).toHaveBeenCalledWith(
      ENCODED_MOCK_CLIENT_ID
    )
  })

  it('renders correct title', () => {
    arrangeTest()

    expect(screen.getByTestId('content-title')).toHaveTextContent(
      'Add Contact for Best Company'
    )
  })

  it('links company name', () => {
    arrangeTest()

    expect(screen.getByText('Best Company').closest('a')).toHaveAttribute(
      'href',
      companyLink
    )
  })

  it('passes encoded client id to RepresentativeForm', () => {
    arrangeTest()

    const expectedProps = {
      clientIdOrRepresentative: ENCODED_MOCK_CLIENT_ID
    }

    expect(RepresentativeFormMock).toHaveBeenCalledWith(
      expect.objectContaining(expectedProps),
      expect.anything()
    )
  })
})
