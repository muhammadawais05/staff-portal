import userEvent from '@testing-library/user-event'
import { act, render, screen, waitFor } from '@toptal/picasso/test-utils'
import React, { ComponentProps } from 'react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import { BreakType, ScheduleType } from '../../types'
import DynamicForm from './DynamicForm'

const onChangeActiveTabMock = jest.fn()
const onSubmitMock = jest.fn()
const setValuesMock = jest.fn()
const onFormInitializedFirstTimeMock = jest.fn()
const onCloseMock = jest.fn()

jest.mock('../FormContent/FormContent', () => ({
  __esModule: true,
  default: () => <div data-testid='form-content' />
}))

const arrangeTest = (props?: Partial<ComponentProps<typeof DynamicForm>>) => {
  const defaultProps = {
    activeTab: BreakType.MULTI,
    autoFocusFirstField: false,
    status: EngagementStatus.SCHEDULED,
    scheduleType: ScheduleType.CREATE,
    loading: false,
    submitText: 'Schedule Break',
    onChangeActiveTab: onChangeActiveTabMock,
    onSubmit: onSubmitMock,
    setValues: setValuesMock,
    onFormInitializedFirstTime: onFormInitializedFirstTimeMock,
    onClose: onCloseMock
  }

  const newProps = {
    ...defaultProps,
    ...props
  }

  render(
    <TestWrapper>
      <DynamicForm {...newProps} />
    </TestWrapper>
  )
}

describe('DynamicForm', () => {
  beforeEach(() => {
    onChangeActiveTabMock.mockClear()
    onSubmitMock.mockClear()
    setValuesMock.mockClear()
    onFormInitializedFirstTimeMock.mockClear()
    onCloseMock.mockClear()
  })

  it('renders default controls', () => {
    arrangeTest({ activeTab: BreakType.MULTI })

    expect(
      screen.getByText(
        `If the client's break affects billing cycles that have already been paid, all related invoices, payments, and commissions will be sent to the accounting team for review and updated accordingly.`
      )
    ).toBeInTheDocument()
    expect(screen.getByTestId('form-content')).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Cancel'
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', {
        name: 'Schedule Break'
      })
    ).toBeInTheDocument()
  })

  it('modal buttons should trigger appropriate callbacks', async () => {
    arrangeTest()

    act(() =>
      userEvent.click(
        screen.getByRole('button', {
          name: 'Cancel'
        })
      )
    )

    expect(onCloseMock).toHaveBeenCalledTimes(1)
    act(() =>
      userEvent.click(
        screen.getByRole('button', {
          name: 'Schedule Break'
        })
      )
    )
    await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1))
  })

  it('tab change should trigger appropriate callback', () => {
    arrangeTest({ activeTab: BreakType.MULTI })
    userEvent.click(screen.getByText('Single-day Break'))
    expect(onChangeActiveTabMock).toHaveBeenCalledTimes(1)
    expect(onChangeActiveTabMock.mock.calls[0][1]).toBe(1)
  })
})
