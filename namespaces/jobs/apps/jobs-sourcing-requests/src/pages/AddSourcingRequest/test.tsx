import React from 'react'
import {
  render,
  screen,
  getByRole,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved
} from '@toptal/picasso/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { MemoryRouter, useNavigate } from '@staff-portal/navigation'
import {
  OperationCallableTypes,
  SourcingRequestEnterpriseJobStatus
} from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { titleize } from '@staff-portal/string'

import { CreateSourcingRequestFormInput, BooleanAsString } from '../../types'
import AddSourcingRequest from '.'
import { useGetJobIdParam } from './hooks'
import { prepareCreateSourcingRequestInput } from '../utils'
import { SourcingRequestJobFragment } from '../../data'
import { createGetJobDataForAddingSourcingRequestMock } from './data/get-job-data-for-adding-sourcing-request/mocks'
import { createFailedCreateSourcingRequestMock } from './data/create-sourcing-request/mocks'

jest.mock('./hooks/use-get-job-id-param')
jest.mock('@staff-portal/navigation', () => ({
  ...jest.requireActual('@staff-portal/navigation'),
  useNavigate: jest.fn()
}))

jest.mock('@toptal/picasso/utils', () => ({
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
// unmocked due to improper reliance of these tests on parts of the package
jest.unmock('@staff-portal/forms')

const useNavigateMock = useNavigate as jest.Mock
const navigateMock = jest.fn()
const useGetJobIdParamMock = useGetJobIdParam as jest.Mock

const useNotificationsMock = useNotifications as jest.Mock
const showError = jest.fn()

const ENCODED_JOB_ID = 'encoded-job-id-123'

const job = {
  id: '123',
  title: 'Senior Developer (123)',
  webResource: {
    text: 'Senior Developer (123)',
    url: 'http://localhost:3000/platform/staff/jobs/123'
  },
  client: {
    id: '1',
    enterprise: true,
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
        <AddSourcingRequest />
      </TestWrapperWithMocks>
    </MemoryRouter>
  )

  if (waitForLoader) {
    await waitForElementToBeRemoved(() =>
      screen.queryByTestId('AddSourcingRequest-PageLoader')
    )
  }
}

const mockOperations = (callable: OperationCallableTypes) => ({
  createSourcingRequest: {
    callable,
    messages: [],
    __typename: 'Operation'
  },
  __typename: 'QueryOperations'
})

const humanBooleanString = (value?: BooleanAsString) => {
  return value === BooleanAsString.TRUE ? 'Yes' : 'No'
}

const setAccountInformationInput = ({
  jobData = {},
  formData = {}
}: {
  jobData?: Partial<SourcingRequestJobFragment>
  formData?: Partial<CreateSourcingRequestFormInput>
}) => {
  if (jobData.client?.enterprise && formData.enterpriseJobStatus) {
    const enterpriseJobStatusGroup = screen.getByTestId(
      'enterprise-job-status-radio-group'
    )
    const enterpriseJobStatus = titleize(formData.enterpriseJobStatus)

    fireEvent.click(
      getByRole(enterpriseJobStatusGroup, 'radio', {
        name: enterpriseJobStatus
      })
    )
  }

  if (formData.canShareCompanyName != undefined) {
    const canShareCompanyNameGroup = screen.getByTestId(
      'can-share-company-name-radio-group'
    )

    fireEvent.click(
      getByRole(canShareCompanyNameGroup, 'radio', {
        name: humanBooleanString(formData.canShareCompanyName)
      })
    )
  }
}

const setBudgetDetailsInput = (
  formData: Partial<CreateSourcingRequestFormInput> = {}
) => {
  if (formData.maximumTalentHourlyRate) {
    fireEvent.change(screen.getByLabelText(/Maximum Talent Hourly Rate/), {
      target: { value: formData.maximumTalentHourlyRate }
    })
  }

  if (formData.noTalentHourlyRateLimit) {
    fireEvent.click(screen.getByLabelText('No Rate Limit'))
  }

  if (formData.canShareRate) {
    const canShareRateGroup = screen.getByTestId('can-share-rate-radio-group')

    fireEvent.click(
      getByRole(canShareRateGroup, 'radio', {
        name: humanBooleanString(formData.canShareRate)
      })
    )
  }

  fireEvent.change(
    screen.getByRole('textbox', { name: 'canShareRateComment' }),
    {
      target: { value: formData.canShareRateComment }
    }
  )

  if (formData.canIncreaseRate) {
    const canIncreaseRateGroup = screen.getByTestId(
      'can-increase-rate-radio-group'
    )

    fireEvent.click(
      getByRole(canIncreaseRateGroup, 'radio', {
        name: humanBooleanString(formData.canIncreaseRate)
      })
    )
  }

  fireEvent.change(
    screen.getByRole('textbox', { name: 'canIncreaseRateComment' }),
    {
      target: { value: formData.canIncreaseRateComment }
    }
  )
}

const setAdditionalNotesInput = (value?: string | null) => {
  fireEvent.change(screen.getByRole('textbox', { name: 'Additional Notes' }), {
    target: { value }
  })
}

const submitForm = async ({
  jobData = {},
  formData = {}
}: {
  jobData?: Partial<SourcingRequestJobFragment>
  formData?: Partial<CreateSourcingRequestFormInput>
}) => {
  setAccountInformationInput({ jobData, formData })
  setBudgetDetailsInput(formData)
  setAdditionalNotesInput(formData.additionalNotes)

  fireEvent.click(screen.getByRole('button', { name: 'Submit Request' }))
}

describe('AddSourcingRequest', () => {
  beforeEach(() => {
    useNavigateMock.mockReturnValue(navigateMock)
    useGetJobIdParamMock.mockReturnValue(['123', ENCODED_JOB_ID])
    useNotificationsMock.mockReturnValue({ showError })
  })

  it('renders PageLoader when loading data', async () => {
    const mocks = [
      createGetJobDataForAddingSourcingRequestMock({
        encodedJobId: ENCODED_JOB_ID,
        loading: true
      })
    ]

    await arrangeTest({ mocks })

    expect(screen.getByText('Loading, please wait…')).toBeInTheDocument()
  })

  it('renders error when the user does not have permission', async () => {
    const mocks = [
      createGetJobDataForAddingSourcingRequestMock({
        encodedJobId: ENCODED_JOB_ID,
        jobData: {
          ...job,
          operations: mockOperations(OperationCallableTypes.HIDDEN)
        }
      })
    ]

    await arrangeTest({ mocks, waitForLoader: true })

    expect(
      screen.getByText('This operation cannot be performed at this moment.')
    ).toBeInTheDocument()
  })

  it('renders page with data', async () => {
    const rawFormData: Partial<CreateSourcingRequestFormInput> = {
      // AccountInformation
      enterpriseJobStatus: SourcingRequestEnterpriseJobStatus.DOOR_OPENING,
      canShareCompanyName: BooleanAsString.TRUE,

      // BudgetDetails
      maximumTalentHourlyRate: '40.5',
      noTalentHourlyRateLimit: false,
      canShareRate: BooleanAsString.FALSE,
      canShareRateComment: 'Do not share rate',
      canIncreaseRate: BooleanAsString.TRUE,
      canIncreaseRateComment: 'Can negotiate',

      // AdditionalNotes
      additionalNotes: 'Some Text'
    }

    const mutationInput = prepareCreateSourcingRequestInput(rawFormData)

    mutationInput.jobId = job.id

    const mocks = [
      createGetJobDataForAddingSourcingRequestMock({
        encodedJobId: ENCODED_JOB_ID,
        jobData: {
          ...job,
          operations: mockOperations(OperationCallableTypes.ENABLED)
        }
      }),
      createFailedCreateSourcingRequestMock(mutationInput)
    ]

    await arrangeTest({ mocks, waitForLoader: true })

    const titleNode = screen.getByText(/Add Sourcing Request for job/)

    expect(titleNode?.textContent?.trim()).toBe(
      `Add Sourcing Request for job ${job.title}`
    )
    expect(titleNode?.getElementsByTagName('A')[0]).toHaveAttribute(
      'href',
      job.webResource.url
    )

    submitForm({
      jobData: job as SourcingRequestJobFragment,
      formData: rawFormData
    })

    // Always fail for now, please change this when we fully implemented the form.
    expect(
      screen.queryByText('The sourcing request was successfully created.')
    ).not.toBeInTheDocument()
  })

  it('clicks Cancel button', async () => {
    const mocks = [
      createGetJobDataForAddingSourcingRequestMock({
        encodedJobId: ENCODED_JOB_ID,
        jobData: {
          ...job,
          operations: mockOperations(OperationCallableTypes.ENABLED)
        }
      })
    ]

    await arrangeTest({ mocks, waitForLoader: true })

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }))

    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith('/jobs/123'))
  })
})
