import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { ClientActivitiesAndNotesScope } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import NoteSectionAdditionalActions from './NoteSectionAdditionalActions'

const setClientActivitiesAndNotesScopeMock = jest.fn()
const setIsSubsidiaryNotesSelectedMock = jest.fn()

const arrangeTest = ({
  clientActivitiesAndNotesScope,
  isSubsidiaryNotesSelected
}: {
  clientActivitiesAndNotesScope: ClientActivitiesAndNotesScope
  isSubsidiaryNotesSelected: boolean
}) =>
  render(
    <TestWrapper>
      <NoteSectionAdditionalActions
        clientActivitiesAndNotesScope={clientActivitiesAndNotesScope}
        isSubsidiaryNotesSelected={isSubsidiaryNotesSelected}
        setClientActivitiesAndNotesScope={setClientActivitiesAndNotesScopeMock}
        setIsSubsidiaryNotesSelected={setIsSubsidiaryNotesSelectedMock}
      />
    </TestWrapper>
  )

describe('NoteSectionAdditionalActions', () => {
  it('renders checked checkboxes', () => {
    arrangeTest({
      clientActivitiesAndNotesScope:
        ClientActivitiesAndNotesScope.ACTIVITIES_AND_NOTES,
      isSubsidiaryNotesSelected: true
    })
    const showActivities = screen
      .getByTestId('NoteSectionAdditionalActions-show-activities')
      .querySelector('input') as Element

    const showSubsidiaryNotes = screen
      .getByTestId('NoteSectionAdditionalActions-show-subsidiary-notes')
      .querySelector('input') as Element

    expect(showActivities).toBeChecked()
    expect(showSubsidiaryNotes).toBeChecked()
  })

  it('renders unchecked checkboxes', () => {
    arrangeTest({
      clientActivitiesAndNotesScope: ClientActivitiesAndNotesScope.ONLY_NOTES,
      isSubsidiaryNotesSelected: false
    })
    const showActivities = screen
      .getByTestId('NoteSectionAdditionalActions-show-activities')
      .querySelector('input') as Element

    const showSubsidiaryNotes = screen
      .getByTestId('NoteSectionAdditionalActions-show-subsidiary-notes')
      .querySelector('input') as Element

    expect(showActivities).not.toBeChecked()
    expect(showSubsidiaryNotes).not.toBeChecked()
  })

  it.each([
    {
      initialScope: ClientActivitiesAndNotesScope.ONLY_NOTES,
      updatedScope: ClientActivitiesAndNotesScope.ACTIVITIES_AND_NOTES
    },
    {
      initialScope: ClientActivitiesAndNotesScope.ACTIVITIES_AND_NOTES,
      updatedScope: ClientActivitiesAndNotesScope.ONLY_NOTES
    }
  ])(
    'propagate `show activities` checkbox selection',
    ({ initialScope, updatedScope }) => {
      arrangeTest({
        clientActivitiesAndNotesScope: initialScope,
        isSubsidiaryNotesSelected: false
      })
      const showActivities = screen
        .getByTestId('NoteSectionAdditionalActions-show-activities')
        .querySelector('input') as Element

      userEvent.click(showActivities)

      expect(setClientActivitiesAndNotesScopeMock).toHaveBeenCalledWith(
        updatedScope
      )
    }
  )

  it('propagate `show subsidiary notes` checkbox selection', () => {
    arrangeTest({
      clientActivitiesAndNotesScope: ClientActivitiesAndNotesScope.ONLY_NOTES,
      isSubsidiaryNotesSelected: false
    })
    const showSubsidiaryNotes = screen
      .getByTestId('NoteSectionAdditionalActions-show-subsidiary-notes')
      .querySelector('input') as Element

    userEvent.click(showSubsidiaryNotes)

    expect(setIsSubsidiaryNotesSelectedMock).toHaveBeenCalledWith(true)
  })
})
