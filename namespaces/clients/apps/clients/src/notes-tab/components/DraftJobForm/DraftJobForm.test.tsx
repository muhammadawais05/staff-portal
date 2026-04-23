import React from 'react'
import { screen, render } from '@testing-library/react'
import { useNotifications } from '@toptal/picasso/utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  useCreateSalesDraftJob,
  CreateSalesDraftJobMutation
} from './data/create-sales-draft-job'
import {
  useUpdateSalesDraftJob,
  UpdateSalesDraftJobMutation
} from './data/update-sales-draft-job'
import DraftJobForm from '.'
import { DraftJobFragment } from '../DraftJobSection/data/draft-job-fragment'
import { DefaultDraftJobFragment } from '../DraftJobSection/data/default-draft-job-fragment'

const mockOnRequestClose = jest.fn() as jest.Mock

jest.mock('./data/create-sales-draft-job', () => ({
  __esModule: true,
  useCreateSalesDraftJob: jest.fn()
}))

jest.mock('./data/update-sales-draft-job', () => ({
  __esModule: true,
  useUpdateSalesDraftJob: jest.fn()
}))

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))

jest.mock('./components/PreferredHoursFields', () => () => (
  <div data-testid='preferred-hours-mock' />
))

const mockUseCreateSalesDraftJob = useCreateSalesDraftJob as jest.Mock
const mockUseUpdateSalesDraftJob = useUpdateSalesDraftJob as jest.Mock
const mockUseNotifications = useNotifications as jest.Mock
const mockShowError = jest.fn()
const mockUpdate = jest.fn()
const mockCreate = jest.fn()

const failedMutation = ({ onError }: { onError: (error: Error) => void }) => {
  onError(new Error('Error'))

  return [() => {}, { isLoading: false }]
}

const createdWithErrors = ({
  onCompleted
}: {
  onCompleted: (data: CreateSalesDraftJobMutation) => void
}) => {
  onCompleted({ createSalesDraftJob: { success: false, errors: [] } })

  return [() => {}, { isLoading: false }]
}

const updatedWithErrors = ({
  onCompleted
}: {
  onCompleted: (data: UpdateSalesDraftJobMutation) => void
}) => {
  onCompleted({ updateSalesDraftJob: { success: false, errors: [] } })

  return [() => {}, { isLoading: false }]
}

const DRAFT_JOB = {
  commitmentSurvey: {
    question: 'commitmentSurvey',
    options: []
  },
  estimatedLengthSurvey: {
    question: 'estimatedLengthSurvey',
    options: []
  },
  hasPreferredHours: false,
  projectTeamInvolvedSurvey: {
    question: 'talentCountSurvey',
    options: []
  },
  projectSpecCompletenessSurvey: {
    question: 'talentCountSurvey',
    options: []
  },
  startDateSurvey: {
    question: 'startDateSurvey',
    options: []
  },
  talentCountSurvey: {
    question: 'talentCountSurvey',
    options: []
  },
  vertical: {
    id: 'vertical-id',
    talentType: 'developers',
    defaultSkillCategory: { id: 'skill' }
  },
  verticals: { edges: [] }
} as unknown as DraftJobFragment

const renderComponent = (
  draftJob:
    | (DefaultDraftJobFragment & Partial<DraftJobFragment>)
    | DraftJobFragment = DRAFT_JOB
) =>
  render(
    <TestWrapper>
      <DraftJobForm
        clientId='client-id'
        onRequestClose={mockOnRequestClose}
        draftJob={draftJob}
        approveClientOperation={{
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }}
      />
    </TestWrapper>
  )

describe('DraftJobForm', () => {
  beforeEach(() => {
    jest.resetAllMocks()

    mockUseCreateSalesDraftJob.mockImplementation(() => [
      mockCreate,
      { isLoading: false }
    ])
    mockUseUpdateSalesDraftJob.mockImplementation(() => [
      mockUpdate,
      { isLoading: false }
    ])

    mockUseNotifications.mockImplementation(() => ({
      showError: mockShowError
    }))
  })

  describe('rendering', () => {
    it('renders all fields', () => {
      renderComponent()

      expect(screen.getByPlaceholderText('Type of Talent')).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText('Enter desired job title')
      ).toBeInTheDocument()
      expect(
        screen.getByPlaceholderText(
          'Enter details about the Company, project requirements, goals that the Client wants to achieve, and any other required details'
        )
      ).toBeInTheDocument()

      expect(screen.getByText('CommitmentSurvey')).toBeInTheDocument()
      expect(screen.getByText('StartDateSurvey')).toBeInTheDocument()
      expect(screen.getByText('EstimatedLengthSurvey')).toBeInTheDocument()
      expect(screen.getByTestId('preferred-hours-mock')).toBeInTheDocument()
    })
  })

  // TODO: https://toptal-core.atlassian.net/browse/SP-1446
  describe('submit / cancel', () => {
    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('calls create mutation for draft job without id', () => {
      renderComponent()

      screen.getByText('Save Draft Job').click()

      expect(mockCreate).toHaveBeenCalled()
    })

    // eslint-disable-next-line jest/no-disabled-tests
    it.skip('calls update mutation for draft job with id', () => {
      renderComponent()

      screen.getByText('Save Draft Job').click()

      expect(mockUpdate).toHaveBeenCalled()
    })

    it('calls onRequestClose after clicking "Cancel"', () => {
      renderComponent()

      screen.getByText('Cancel').click()

      expect(mockOnRequestClose).toHaveBeenCalled()
    })
  })

  describe('error handling', () => {
    it('does not show error for successful mutation', () => {
      renderComponent()

      expect(mockShowError).not.toHaveBeenCalled()
    })

    it('shows error for failed create mutation', () => {
      mockUseCreateSalesDraftJob.mockImplementation(failedMutation)

      renderComponent()

      expect(mockShowError).toHaveBeenCalledTimes(1)
    })

    it('shows error for completed create mutation with errors', () => {
      mockUseCreateSalesDraftJob.mockImplementation(createdWithErrors)

      renderComponent()

      expect(mockShowError).toHaveBeenCalledTimes(1)
    })

    it('shows error for failed update mutation', () => {
      mockUseUpdateSalesDraftJob.mockImplementation(failedMutation)

      renderComponent()

      expect(mockShowError).toHaveBeenCalledTimes(1)
    })

    it('shows error for completed update mutation with errors', () => {
      mockUseUpdateSalesDraftJob.mockImplementation(updatedWithErrors)

      renderComponent()

      expect(mockShowError).toHaveBeenCalledTimes(1)
    })
  })
})
