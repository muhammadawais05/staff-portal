import { render, screen } from '@testing-library/react'
import React from 'react'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import AddPrescreeningNoteButton, { Props } from './AddPrescreeningNoteButton'
import { useCreatePrescreeningTalentNote } from './data'

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
  useCreatePrescreeningTalentNote: jest.fn()
}))

const mockReturnValues = () => {
  const mockUseCreatePrescreeningTalentNote =
    useCreatePrescreeningTalentNote as jest.Mock

  mockUseCreatePrescreeningTalentNote.mockReturnValue([
    () => ({
      data: {
        createPrescreeningTalentNote: {
          success: true
        }
      }
    })
  ])
}

const arrangeTest = (props: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <AddPrescreeningNoteButton
        {...props}
        talent={{ id: 'VjEtVGFsZW50LTIxNzIxODM', fullName: 'Awesome Talent' }}
        onComplete={() => {}}
        formContainer={{ current: document.querySelector('#container') }}
      />
      <div id='container' />
    </TestWrapper>
  )

describe('AddPrescreeningNoteButton', () => {
  it('hides the add prescreening note button', () => {
    mockReturnValues()
    arrangeTest()

    expect(screen.queryByText('Add Prescreening Note')).not.toBeInTheDocument()
  })

  it('shows the add prescreening note button', () => {
    mockReturnValues()
    arrangeTest({
      createPrescreeningNoteOperation: {
        callable: OperationCallableTypes.ENABLED,
        messages: []
      }
    })

    expect(screen.getByText('Add Prescreening Note')).toBeInTheDocument()
  })
})
