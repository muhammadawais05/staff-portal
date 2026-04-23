import { render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AddOnlineTestNoteButton, { Props } from './AddOnlineTestNoteButton'
import { useCreateOnlineTestTalentNote } from './data'

jest.mock('../AddCustomNoteButton', () => ({
  __esModule: true,
  default: ({
    children,
    initialOperation
  }: {
    children: JSX.Element
    initialOperation?: {}
  }) => (initialOperation ? <>{children}</> : null)
}))

jest.mock('./data', () => ({
  __esModule: true,
  useCreateOnlineTestTalentNote: jest.fn()
}))

const mockReturnValues = () => {
  const mockUseCreateOnlineTestTalentNote =
    useCreateOnlineTestTalentNote as jest.Mock

  mockUseCreateOnlineTestTalentNote.mockReturnValue([
    () => ({
      data: {
        createOnlineTestTalentNote: {
          success: true
        }
      }
    })
  ])
}

const arrangeTest = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <AddOnlineTestNoteButton
        {...props}
        talent={{ id: 'VjEtVGFsZW50LTIxNzIxODM', fullName: 'Awesome Talent' }}
        verticalId='VjEtVGFsZW50LTIxNzIxODM'
        onComplete={() => {}}
        formContainer={{ current: document.querySelector('#container') }}
      />
      <div id='container' />
    </TestWrapper>
  )

describe('AddOnlineTestNoteButton', () => {
  it('hides the "Add Online Test Note" button', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.queryByText('Add Online Test Note')).not.toBeInTheDocument()
  })

  it('shows the "Add Online Test Note" button', () => {
    mockReturnValues()
    arrangeTest({
      createOnlineTestNote: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    })

    expect(screen.getByText('Add Online Test Note')).toBeInTheDocument()
  })
})
