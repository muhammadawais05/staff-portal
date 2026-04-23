import userEvent from '@testing-library/user-event'
import { Form } from '@toptal/picasso-forms'
import { render, screen } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import { BreakType, ScheduleType } from '../../types'
import FormContent from './FormContent'

const setValuesMock = jest.fn()
const onFormInitializedFirstTimeMock = jest.fn()

// TODO avoid using real DatePicker in tests https://toptal-core.atlassian.net/browse/SPB-2311
jest.mock('@toptal/picasso/DatePicker', () =>
  jest.requireActual('@toptal/picasso/DatePicker')
)

jest.mock('@staff-portal/feedbacks', () => ({
  ...jest.requireActual('@staff-portal/feedbacks'),
  FormReasonSelect: () => <div data-testid='reason-select' />
}))

const arrangeTest = (
  props: Omit<
    ComponentProps<typeof FormContent>,
    'setValues' | 'onFormInitializedFirstTime'
  >
) =>
  render(
    <TestWrapperWithMocks>
      <Form onSubmit={() => {}}>
        <FormContent
          setValues={setValuesMock}
          onFormInitializedFirstTime={onFormInitializedFirstTimeMock}
          {...props}
        />
      </Form>
    </TestWrapperWithMocks>
  )

describe('FormContent', () => {
  beforeEach(() => {
    setValuesMock.mockClear()
    onFormInitializedFirstTimeMock.mockClear()
  })

  it('renders default fields', () => {
    arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: false,
      status: EngagementStatus.SCHEDULED,
      scheduleType: ScheduleType.EDIT
    })

    expect(screen.getByLabelText(/Message to the client/i)).toBeInTheDocument()
  })

  it('renders multi fields', () => {
    arrangeTest({
      type: BreakType.MULTI,
      autoFocusFirstField: false,
      scheduleType: ScheduleType.EDIT,
      status: EngagementStatus.SCHEDULED
    })

    expect(screen.getByLabelText(/First Day of Break/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Day of Break/)).toBeInTheDocument()
  })

  it('renders single fields', () => {
    arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: false,
      scheduleType: ScheduleType.EDIT,
      status: EngagementStatus.SCHEDULED
    })

    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument()
    expect(
      screen.queryByLabelText(/First day of break/i)
    ).not.toBeInTheDocument()
    expect(
      screen.queryByLabelText(/Last day of break/i)
    ).not.toBeInTheDocument()
  })

  it('renders fields for CREATE scheduleType', () => {
    arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: false,
      scheduleType: ScheduleType.CREATE,
      status: EngagementStatus.SCHEDULED
    })

    expect(screen.getByTestId('reason-select')).toBeInTheDocument()
    expect(screen.getByLabelText(/Details/i)).toBeInTheDocument()
  })

  it('does not render some fields for EDIT scheduleType', () => {
    arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: false,
      scheduleType: ScheduleType.EDIT,
      status: EngagementStatus.SCHEDULED
    })

    expect(screen.queryByTestId('reason-select')).not.toBeInTheDocument()
    expect(screen.queryByLabelText(/Details/i)).not.toBeInTheDocument()
  })

  it('should emit form values before destroy', () => {
    const { unmount } = arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: false,
      scheduleType: ScheduleType.CREATE,
      status: EngagementStatus.SCHEDULED
    })
    const details = screen.getByLabelText(/Details/)
    const messageToClient = screen.getByLabelText(/Message to the client/i)

    userEvent.type(details, 'Details Value')
    userEvent.type(messageToClient, 'Message Value')
    unmount()
    expect(setValuesMock).toHaveBeenCalledWith({
      comment: 'Details Value',
      messageToClient: 'Message Value'
    })
    expect(setValuesMock).toHaveBeenCalledTimes(1)
  })

  it('should emit onFormInitializedFirstTime callback once on init', () => {
    arrangeTest({
      type: BreakType.SINGLE,
      autoFocusFirstField: true,
      scheduleType: ScheduleType.CREATE,
      status: EngagementStatus.SCHEDULED
    })
    expect(onFormInitializedFirstTimeMock).toHaveBeenCalledTimes(1)
  })
})
