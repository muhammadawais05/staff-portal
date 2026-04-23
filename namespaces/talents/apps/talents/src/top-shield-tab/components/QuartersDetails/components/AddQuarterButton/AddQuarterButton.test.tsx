import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'

import AddQuarterButton from '.'

const arrangeTest = (
  props: Pick<ComponentProps<typeof AddQuarterButton>, 'operation'>
) => {
  return render(
    <TestWrapper>
      <AddQuarterButton id='123' operation={props.operation} />
    </TestWrapper>
  )
}

describe('AddQuarterButton', () => {
  describe('when operation is disabled', () => {
    it('renders non-editable value', () => {
      arrangeTest({
        operation: createOperationMock({
          callable: OperationCallableTypes.DISABLED
        })
      })

      expect(screen.queryByTestId('addQuarterButton')).not.toBeEnabled()
    })
  })

  describe('when operation is enabled', () => {
    it('renders editable value', () => {
      arrangeTest({ operation: createOperationMock() })

      expect(screen.getByTestId('addQuarterButton')).toBeEnabled()
    })
  })
})
