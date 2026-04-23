import React from 'react'
import { fireEvent, screen, within } from '@testing-library/react'
import { render } from '@toptal/picasso/test-utils'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import Operation from './Operation'

const TEST_COMPONENT_TEST_ID = 'test-id-bk5'
const ENABLED_TEXT = 'Component is enabled'
const DISABLED_TEXT = 'Component is disabled'
const TestComponent = ({
  disabled
}: { disabled: boolean }) => {
  return (
    <span data-testid={TEST_COMPONENT_TEST_ID}>
      {disabled ? DISABLED_TEXT : ENABLED_TEXT}
    </span>
  )
}

describe('Operation', () => {
  it('should render enabled operations', () => {
    render(
      <Operation
        operation={{
          callable: OperationCallableTypes.ENABLED,
          messages: []
        }}
        render={disabled => <TestComponent disabled={disabled} />}
      />
    )

    expect(screen.getByText(ENABLED_TEXT)).toBeInTheDocument()
  })

  it('should render disabled operations, display tooltip and provide disabled property via context', async () => {
    const MESSAGES = ['Test message 1', 'Test message 2']

    render(
      <Operation
        operation={{
          callable: OperationCallableTypes.DISABLED,
          messages: MESSAGES
        }}
        render={disabled => <TestComponent disabled={disabled} />}
      />
    )

    fireEvent.mouseOver(screen.getByText(DISABLED_TEXT))

    const tooltip = await screen.findByRole('tooltip')

    expect(
      await within(tooltip).findByText('Test message 1')
    ).toBeInTheDocument()
    expect(
      await within(tooltip).findByText('Test message 2')
    ).toBeInTheDocument()
  })

  it('should not render hidden operations', () => {
    render(
      <Operation
        operation={{
          callable: OperationCallableTypes.HIDDEN,
          messages: []
        }}
        render={disabled => <TestComponent disabled={disabled} />}
      />
    )

    expect(screen.queryByTestId(TEST_COMPONENT_TEST_ID)).not.toBeInTheDocument()
  })
})
