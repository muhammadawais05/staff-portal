import React from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@toptal/picasso/test-utils'
import { useNotifications } from '@toptal/picasso/utils'
import { SpecialistAssignmentArchivingReasons as ArchiveReason } from '@staff-portal/graphql/staff'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { SpecialistAssignmentFragment } from '../../data/specialist-assignment-fragment.staff.gql.types'
import {
  createArchiveSpecialistAssignmentsFailedMock,
  createArchiveSpecialistAssignmentsMock
} from './data/archive-specialist-assignments/mocks'
import { createSpecialistAssignmentMock } from '../../data/mocks'
import { ASSIGNMENT_ARCHIVE_REASONS } from '../../constants'
import { TssSegmentEvents } from '../../segment-events'
import ArchiveModal from './ArchiveModal'

const BASIC_ARCHIVE_REASONS = ASSIGNMENT_ARCHIVE_REASONS.filter(
  reason => reason.value !== ArchiveReason.OTHER
)
const hideModal = jest.fn()
const mockTrackFn = jest.fn()

jest.mock('@toptal/picasso/utils', () => ({
  __esModule: true,
  ...jest.requireActual('@toptal/picasso/utils'),
  useNotifications: jest.fn()
}))
jest.mock('@staff-portal/monitoring-service', () => ({
  useAnalytics: () => ({
    track: mockTrackFn
  })
}))

const mockUseNotifications = useNotifications as jest.Mock

const arrangeTest = (
  {
    assignmentIds,
    trackEvent
  }: { assignmentIds: string[]; trackEvent?: TssSegmentEvents } = {
    assignmentIds: []
  },
  mocks?: MockedResponse[]
) =>
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ArchiveModal
        hideModal={hideModal}
        assignmentIds={assignmentIds}
        trackEvent={trackEvent}
      />
    </TestWrapperWithMocks>
  )

let assignment: SpecialistAssignmentFragment

describe('ArchiveModal component', () => {
  beforeEach(() => {
    mockUseNotifications.mockReturnValue({ showError: jest.fn() })
    assignment = createSpecialistAssignmentMock()
  })

  it('archive specialist assignment', async () => {
    const assignments = [assignment]
    const reason = ArchiveReason.LEGAL_ISSUES
    const comment = 'TEST_COMMENT'

    const archiveSpecialistAssignmentsMock =
      createArchiveSpecialistAssignmentsMock({
        assignments,
        reason,
        comment,
        success: true,
        errors: []
      })

    const trackEvent = TssSegmentEvents.BULK_ARCHIVE_CLICKED

    arrangeTest({ assignmentIds: [assignment.id], trackEvent }, [
      archiveSpecialistAssignmentsMock
    ])

    fireEvent.click(screen.getByLabelText(/Reason/))
    fireEvent.click(screen.getByText('Legal issues'))

    fireEvent.change(screen.getByLabelText(/Comment/), {
      target: { value: comment }
    })

    fireEvent.click(screen.getByTestId('archive-button'))

    expect(screen.queryByRole('alert')).not.toBeInTheDocument()

    expect(mockTrackFn).toHaveBeenCalledWith(trackEvent)

    await waitFor(() => {
      expect(hideModal).toHaveBeenCalled()
    })
  })

  describe('when unable to archive a specialist assignment', () => {
    it('shows graphql error', async () => {
      const assignments = [assignment]
      const reason = ArchiveReason.OTHER
      const comment = 'TEST_COMMENT'
      const error = 'TEST_ERROR'
      const showError = jest.fn()

      mockUseNotifications.mockReturnValue({ showError })

      const archiveSpecialistAssignmentsMock =
        createArchiveSpecialistAssignmentsMock({
          assignments,
          reason,
          comment,
          success: false,
          errors: [
            {
              key: 'some_key',
              code: 'some_code',
              message: error
            }
          ]
        })

      arrangeTest({ assignmentIds: [assignment.id] }, [
        archiveSpecialistAssignmentsMock
      ])

      fireEvent.click(screen.getByLabelText(/Reason/))
      fireEvent.click(screen.getByText('Other'))

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: comment }
      })

      fireEvent.click(screen.getByTestId('archive-button'))

      await waitFor(() => {
        expect(showError).toHaveBeenCalledWith(
          `Unable to archive specialist assignment, the following errors occurred: ${error}.`
        )
      })

      await waitFor(() => {
        expect(hideModal).toHaveBeenCalled()
      })
    })
  })

  describe('when unable to send the request', () => {
    it('shows graphql error', async () => {
      const reason = ArchiveReason.COVID19
      const comment = 'TEST_COMMENT'
      const showError = jest.fn()

      mockUseNotifications.mockReturnValue({ showError })

      const archiveSpecialistAssignmentsMock =
        createArchiveSpecialistAssignmentsFailedMock({
          variables: {
            input: {
              specialistAssignmentIds: [assignment.id],
              reason,
              comment
            }
          }
        })

      arrangeTest({ assignmentIds: [assignment.id] }, [
        archiveSpecialistAssignmentsMock
      ])

      fireEvent.click(screen.getByLabelText(/Reason/))
      fireEvent.click(screen.getByText('Covid-19'))

      fireEvent.change(screen.getByLabelText(/Comment/), {
        target: { value: comment }
      })

      fireEvent.click(screen.getByTestId('archive-button'))

      await waitFor(() => {
        expect(showError).toHaveBeenCalledWith(
          'Unable to archive specialist assignment.'
        )
      })

      await waitFor(() => {
        expect(hideModal).toHaveBeenCalled()
      })
    })
  })

  BASIC_ARCHIVE_REASONS.forEach(reason => {
    describe(`when "${reason.text}" reason selected`, () => {
      it(`renders a modal with an optional "comment" field`, () => {
        arrangeTest({ assignmentIds: [assignment.id] })

        fireEvent.click(screen.getByLabelText(/Reason/))
        fireEvent.click(screen.getByText(reason.text))

        expect(screen.getByText('Comment')).toBeInTheDocument()
      })
    })
  })

  describe('when there are no talents were selected', () => {
    it('renders nothing', () => {
      arrangeTest()

      expect(screen.queryByText('Archive')).not.toBeInTheDocument()
    })
  })

  describe('when "Other" reason selected', () => {
    it('renders a modal with a mandatory "comment" field', () => {
      arrangeTest({ assignmentIds: [assignment.id] })

      fireEvent.click(screen.getByLabelText(/Reason/))
      fireEvent.click(screen.getByText('Other'))

      expect(screen.getByText('Reason')).toBeInTheDocument()
      expect(screen.getByText('Comment')).toBeInTheDocument()
    })
  })
})
