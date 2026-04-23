import { fireEvent, render, screen, within } from '@toptal/picasso/test-utils'
import React from 'react'
import { Operation, OperationCallableTypes } from '@staff-portal/graphql/staff'
import { assertOnTooltip, TestWrapper } from '@staff-portal/test-utils'

import ExtraHoursEnabledField from './ExtraHoursEnabledField'

jest.unmock('@staff-portal/editable')
jest.mock('./data', () => ({
  getLazyEngagementExtraHoursHook: () => () => ({
    request: () => ({}),
    data: undefined,
    loading: false
  }),
  useUpdateEngagementExtraHoursEnabled: () => [
    () => ({
      data: {
        updateEngagementExtraHoursEnabled: {
          success: true,
          errors: []
        }
      }
    }),
    { loading: false }
  ]
}))

const INITIAL_OPERATION: Operation = {
  callable: OperationCallableTypes.ENABLED,
  messages: []
}

const arrangeTest = ({
  extraHoursEnabled = false,
  operation = INITIAL_OPERATION
}: Partial<{
  extraHoursEnabled: boolean
  operation: Operation
}> = {}) =>
  render(
    <TestWrapper>
      <ExtraHoursEnabledField
        engagementId='1'
        extraHoursEnabled={extraHoursEnabled}
        operation={operation}
      />
    </TestWrapper>
  )

describe('ExtraHoursEnabledField', () => {
  it('displays "No" when extra hour is disabled', () => {
    arrangeTest()

    expect(screen.getByText('No')).toBeInTheDocument()
  })

  it('displays "Yes" when extra hour is enabled', () => {
    arrangeTest({ extraHoursEnabled: true })

    expect(screen.getByText('Yes')).toBeInTheDocument()
  })

  it('renders proper tooltip text', () => {
    arrangeTest({ extraHoursEnabled: true })

    assertOnTooltip(screen.getByText('Yes'), tooltip => {
      expect(
        within(tooltip).getByText(
          'Changes to this setting will take effect immediately for the current billing cycle, and will generate notifications to the client and talent.'
        )
      ).toBeInTheDocument()
    })
  })

  it('change the extra hour option', async () => {
    arrangeTest()

    fireEvent.click(
      screen.getByTestId('EditableField-toggle-button-extraHoursEnabled')
    )

    const extraHoursEnabledElement = screen.getByTestId(
      'EditableField-extraHoursEnabled-editor'
    )

    fireEvent.click(within(extraHoursEnabledElement).getAllByRole('textbox')[0])

    fireEvent.click(await screen.findByText('Yes'))

    expect(
      await screen.findByTestId('EditableField-toggle-button-extraHoursEnabled')
    ).toBeInTheDocument()
  })
})
