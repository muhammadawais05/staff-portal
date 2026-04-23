import React, { ComponentProps } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createTopShieldApplicationMock } from '@staff-portal/talents-top-shield/src/mocks'
import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { createOperationMock } from '@staff-portal/operations/src/mocks'
import { CreateTopShieldApplicationInterviewNoteForm } from '@staff-portal/talents-top-shield'

import NotesList from '.'

jest.unmock('@staff-portal/editable')
jest.mock('@staff-portal/notes/src/hooks/use-note-notifications')
jest.mock('@staff-portal/forms', () => ({
  usePersistentForm: () => null,
  usePersistentFormContext: () => ({
    getFormKeys: () => [],
    getForm: () => null,
    setForm: () => null
  })
}))
jest.mock('@staff-portal/talents-top-shield', () => ({
  ...jest.requireActual('@staff-portal/talents-top-shield'),
  CreateTopShieldApplicationInterviewNoteForm: jest.fn()
}))
const CreateTopShieldApplicationInterviewNoteFormMock =
  CreateTopShieldApplicationInterviewNoteForm as jest.Mock

const arrangeTest = (props: ComponentProps<typeof NotesList>) => {
  return render(
    <TestWrapperWithMocks mocks={[]}>
      <NotesList
        talentTopShield={props.talentTopShield}
        refetch={props.refetch}
      />
    </TestWrapperWithMocks>
  )
}

describe('NotesList', () => {
  beforeEach(() => {
    CreateTopShieldApplicationInterviewNoteFormMock.mockImplementation(() => (
      <div data-testid='createTopShieldApplicationInterviewNoteForm'></div>
    ))
  })

  it('renders notes list with "addNote" button', () => {
    const talentTopShield = createTopShieldApplicationMock()

    arrangeTest({ talentTopShield, refetch: () => null })

    expect(screen.getByTestId('notes-section')).toBeInTheDocument()
    expect(screen.getByTestId('addNoteButton')).toBeEnabled()
    expect(screen.getByText('Test comment')).toBeInTheDocument()
    expect(screen.queryByTestId('submit-note-button')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('addNoteButton'))

    expect(screen.queryByTestId('submit-note-button')).toBeInTheDocument()
  })

  it('renders "addTopShieldNoteButton" button', () => {
    const talentTopShield = createTopShieldApplicationMock()

    arrangeTest({ talentTopShield, refetch: () => null })

    expect(screen.getByTestId('addTopShieldNoteButton')).toBeEnabled()
    expect(screen.queryByTestId('submit-note-button')).not.toBeInTheDocument()

    fireEvent.click(screen.getByTestId('addTopShieldNoteButton'))

    expect(
      screen.queryByTestId('createTopShieldApplicationInterviewNoteForm')
    ).toBeInTheDocument()
  })

  describe('when "addGeneralTopShieldApplicationNote" operation is disabled', () => {
    it('disables the "addNote" button', () => {
      const talentTopShield = createTopShieldApplicationMock()

      Object.assign(talentTopShield.topShieldApplication?.operations, {
        addGeneralTopShieldApplicationNote: createOperationMock({
          callable: OperationCallableTypes.DISABLED
        })
      })

      arrangeTest({ talentTopShield, refetch: () => null })

      expect(screen.getByTestId('addNoteButton')).not.toBeEnabled()
    })
  })

  describe('when "addTopShieldApplicationInterviewNote" operation is disabled', () => {
    it('disables the "addNote" button', () => {
      const talentTopShield = createTopShieldApplicationMock()

      Object.assign(talentTopShield.topShieldApplication?.operations, {
        addTopShieldApplicationInterviewNote: createOperationMock({
          callable: OperationCallableTypes.DISABLED
        })
      })

      arrangeTest({ talentTopShield, refetch: () => null })

      expect(screen.getByTestId('addTopShieldNoteButton')).not.toBeEnabled()
    })
  })
})
