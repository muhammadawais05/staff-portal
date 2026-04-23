import { render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { ApolloError } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import DraftJobSection from '.'
import { useGetDraftJob } from './data/get-draft-job'
import { Props as DraftJobCreateButtonProps } from '../DraftJobCreateButton/DraftJobCreateButton'

jest.mock('./data/get-draft-job')

jest.mock(
  '../DraftJobCreateButton',
  () =>
    ({ onClick }: DraftJobCreateButtonProps) =>
      <div data-testid='mock-draft-job-create-button' onClick={onClick} />
)

jest.mock('@staff-portal/ui', () => ({
  __esModule: true,
  SectionWithDetailedListSkeleton: () => <span data-testid='loader-mock' />
}))

jest.mock('../DraftJobContent', () => ({
  __esModule: true,
  default: () => <span data-testid='draft-job-content' />
}))

jest.mock('../DraftJobForm', () => ({
  __esModule: true,
  default: () => <span data-testid='draft-job-form' />
}))

const useGetDraftJobMock = useGetDraftJob as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <DraftJobSection companyId='test-id' />
    </TestWrapper>
  )

const createMockData = ({
  logClientSalesCallOperationCallable = OperationCallableTypes.ENABLED,
  loading,
  hasCompany,
  draftJobs,
  defaultDraftJob,
  error,
  messages = []
}: {
  logClientSalesCallOperationCallable?: OperationCallableTypes
  loading?: boolean
  hasCompany?: boolean
  draftJobs?: { id: string }[]
  defaultDraftJob?: { id: string }
  error?: ApolloError
  messages?: string[]
} = {}) => ({
  loading: Boolean(loading),
  error,
  company:
    typeof hasCompany !== 'undefined'
      ? false
      : {
          id: 'test-id',
          claimer: null,
          draftJobs: {
            nodes: draftJobs || []
          },
          defaultDraftJob,
          operations: {
            createSalesDraftJob: {
              callable: OperationCallableTypes.ENABLED,
              messages
            },
            logClientSalesCall: {
              callable: logClientSalesCallOperationCallable,
              messages
            }
          }
        }
})

describe('DraftJobSection', () => {
  it('renders loader when loading and company is not there yet', () => {
    useGetDraftJobMock.mockReturnValue(
      createMockData({ loading: true, hasCompany: false })
    )
    renderComponent()

    expect(screen.queryByTestId('loader-mock')).toBeInTheDocument()
  })

  it('does not render loader when draft job is cached already', () => {
    useGetDraftJobMock.mockReturnValue(
      createMockData({ loading: true, draftJobs: [{ id: 'doot-doot' }] })
    )
    renderComponent()

    expect(screen.queryByTestId('loader-mock')).not.toBeInTheDocument()
  })

  it('does not render anything if error was raised', async () => {
    useGetDraftJobMock.mockReturnValue(
      createMockData({ error: new Error('Doot!') as ApolloError })
    )

    const { container } = renderComponent()

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  it('does not render anything if logClientSalesCall operation is HIDDEN', async () => {
    useGetDraftJobMock.mockReturnValue(
      createMockData({
        logClientSalesCallOperationCallable: OperationCallableTypes.HIDDEN
      })
    )

    const { container } = renderComponent()

    expect(container.firstChild).toBeEmptyDOMElement()
  })

  describe('when company has no draft jobs', () => {
    it('renders "Currently, there is no Draft Job." message', async () => {
      useGetDraftJobMock.mockReturnValue(
        createMockData({
          draftJobs: []
        })
      )

      renderComponent()

      expect(screen.getByTestId('draft-job-section-no-data').textContent).toBe(
        'Currently, there is no Draft Job.'
      )
    })
  })

  describe('when company has draft jobs', () => {
    it('renders DraftJobContent component for each draft job', async () => {
      useGetDraftJobMock.mockReturnValue(
        createMockData({
          draftJobs: [{ id: 'draft-1' }, { id: 'draft-2' }]
        })
      )

      renderComponent()

      expect(screen.queryAllByTestId('draft-job-content')).toHaveLength(2)
    })
  })

  it('renders "Log Draft Job" button', () => {
    useGetDraftJobMock.mockReturnValue(createMockData())
    renderComponent()

    expect(
      screen.getByTestId('mock-draft-job-create-button')
    ).toBeInTheDocument()
  })

  it('does not render DraftJobForm without interaction', () => {
    useGetDraftJobMock.mockReturnValue(createMockData())
    renderComponent()

    expect(screen.queryByTestId('draft-job-form')).not.toBeInTheDocument()
  })

  it('renders DraftJobForm if "Log Draft Job" is clicked', () => {
    useGetDraftJobMock.mockReturnValue(
      createMockData({
        defaultDraftJob: { id: 'doot-doot' }
      })
    )
    renderComponent()

    screen.getByTestId('mock-draft-job-create-button')?.click()

    expect(screen.queryByTestId('draft-job-form')).toBeInTheDocument()
  })
})
