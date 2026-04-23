import { fireEvent, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { createScheduleEngagementFragmentMock } from '../../data/fragments/schedule-engagement-fragment/mock'
import { createScheduleInterviewFragmentMock } from '../../data/fragments/schedule-interview-fragment/mock'
import ScheduleGenericInterviewModalContent, {
  Props
} from './ScheduleGenericInterviewModalContent'
import { adjustFormData } from './utils'

jest.mock('../ScheduleInterviewForm', () => ({
  __esModule: true,
  default: () => <div data-testid='schedule-interview-form' />
}))

const arrangeTest = ({
  isTopSchedulerAvailable = true,
  areTopSchedulerTimeSlotsUnavailable,
  prefix,
  buttonPrefix,
  isNew,
  scheduleInterview,
  onSubmit = () => {
    return undefined
  }
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <ScheduleGenericInterviewModalContent
        isTopSchedulerAvailable={isTopSchedulerAvailable}
        areTopSchedulerTimeSlotsUnavailable={
          areTopSchedulerTimeSlotsUnavailable
        }
        scheduleEngagement={createScheduleEngagementFragmentMock()}
        scheduleInterview={
          scheduleInterview || createScheduleInterviewFragmentMock()
        }
        timezones={[]}
        isNew={isNew}
        prefix={prefix}
        buttonPrefix={buttonPrefix}
        zoomExperimentEnabled={false}
        onClose={() => {}}
        onSubmit={onSubmit}
      />
    </TestWrapper>
  )

describe('ScheduleInterviewModal', () => {
  it('shows the scheduling switcher', async () => {
    arrangeTest()

    expect(
      screen.getByText(/Schedule an interview with the Classic Scheduler/)
    ).toBeInTheDocument()

    fireEvent.click(screen.getByText('Use Classic Scheduling'))

    expect(
      await screen.findByText(/Schedule an interview with the TopScheduler/)
    ).toBeInTheDocument()
  })

  it('does not render the confirmation when there is a new interview scheduled', async () => {
    const onSubmit = jest.fn()
    const mock = adjustFormData({
      scheduleEngagement: createScheduleEngagementFragmentMock(),
      scheduleInterview: createScheduleInterviewFragmentMock()
    })

    arrangeTest({ isNew: true, onSubmit })

    await waitFor(() => {
      fireEvent.click(
        screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
      )
    })

    expect(
      screen.queryByText('Are you sure you want to reschedule this interview?')
    ).not.toBeInTheDocument()

    expect(onSubmit).toHaveBeenCalledWith({
      isClassic: false,
      values: { ...mock }
    })
  })

  it('renders the confirmation modal and submits the Top Scheduler form', async () => {
    const onSubmit = jest.fn()
    const mock = adjustFormData({
      scheduleEngagement: createScheduleEngagementFragmentMock(),
      scheduleInterview: createScheduleInterviewFragmentMock()
    })

    arrangeTest({ onSubmit })

    await waitFor(() => {
      fireEvent.click(
        screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
      )
    })

    expect(
      screen.getByText('Are you sure you want to reschedule this interview?')
    ).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(
        screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
      )
    })

    expect(onSubmit).toHaveBeenCalledWith({
      isClassic: false,
      values: { ...mock }
    })
  })

  it('renders the confirmation modal and submits the Classic scheduling form', async () => {
    const onSubmit = jest.fn()
    const mock = adjustFormData({
      scheduleEngagement: createScheduleEngagementFragmentMock(),
      scheduleInterview: createScheduleInterviewFragmentMock()
    })

    arrangeTest({ onSubmit })

    fireEvent.click(screen.getByText('Use Classic Scheduling'))

    expect(
      await screen.findByText(/Schedule an interview with the TopScheduler/)
    ).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(
        screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
      )
    })

    expect(
      screen.getByText('Are you sure you want to reschedule this interview?')
    ).toBeInTheDocument()

    await waitFor(() => {
      fireEvent.click(
        screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
      )
    })

    expect(onSubmit).toHaveBeenCalledWith({
      isClassic: true,
      values: { ...mock }
    })
  })

  it('shows default title', async () => {
    arrangeTest()

    expect(
      screen.getByText('Schedule Top Scheduler Interview')
    ).toBeInTheDocument()

    expect(screen.getAllByText('Schedule Interview')).toHaveLength(1)

    fireEvent.click(screen.getByText('Use Classic Scheduling'))

    expect(await screen.findAllByText('Schedule Interview')).toHaveLength(2)
  })

  it('shows custom title', async () => {
    arrangeTest({ prefix: 'Reschedule' })

    expect(
      screen.getByText('Reschedule Top Scheduler Interview')
    ).toBeInTheDocument()

    expect(screen.getAllByText('Reschedule Interview')).toHaveLength(1)

    fireEvent.click(screen.getByText('Use Classic Scheduling'))

    expect(await screen.findAllByText(/Reschedule Interview/)).toHaveLength(2)
  })

  it('shows custom button text', async () => {
    arrangeTest({ prefix: 'Schedule', buttonPrefix: 'Schedule Internal' })

    expect(
      screen.getByText('Schedule Top Scheduler Interview')
    ).toBeInTheDocument()
    expect(screen.getAllByText('Schedule Internal Interview')).toHaveLength(1)
  })

  describe('when Top Scheduler time slots are not available', () => {
    it('display proper message in alert and in notification', async () => {
      const onSubmit = jest.fn()
      const scheduleInterview = createScheduleInterviewFragmentMock()

      arrangeTest({
        onSubmit,
        scheduleInterview,
        areTopSchedulerTimeSlotsUnavailable: true
      })

      expect(
        screen.getByTestId(
          'ScheduleGenericInterviewModal-top-scheduler-not-available'
        )
      ).toBeInTheDocument()

      await waitFor(() => {
        fireEvent.click(
          screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
        )
      })

      expect(
        screen.getByText('Are you sure you want to reschedule this interview?')
      ).toBeInTheDocument()

      await waitFor(() => {
        fireEvent.click(
          screen.getByTestId('ScheduleGenericInterviewModal-submit-button')
        )
      })

      expect(
        await screen.findByText('Top Scheduler is not available.')
      ).toBeInTheDocument()

      expect(onSubmit).not.toHaveBeenCalled()
    })
  })
})
