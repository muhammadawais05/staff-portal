import { arrayMutators, Form } from '@toptal/picasso-forms'
import { fireEvent, render, screen, within } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import { ContactType } from '../../types'
import FormInterviewContactsTags from './FormInterviewContactsTags'

const AVAILABLE_CONTACTS: ContactType[] = [
  { id: '1', fullName: 'Contact 1' },
  { id: '2', fullName: 'Contact 2' },
  { id: '3', fullName: 'Contact 3' }
]

const arrangeTest = ({
  availableContacts,
  selectedContacts
}: {
  availableContacts: ContactType[]
  selectedContacts: string[]
}) =>
  render(
    <TestWrapper>
      <Form
        mutators={{ ...arrayMutators }}
        initialValues={{
          interviewContacts: selectedContacts,
          primaryContactId: '1'
        }}
        onSubmit={() => {}}
      >
        <FormInterviewContactsTags availableContacts={availableContacts} />
      </Form>
    </TestWrapper>
  )

describe('FormInterviewContactsTags', () => {
  describe('when there are no contacts', () => {
    it('hides the tags group', () => {
      arrangeTest({ availableContacts: [], selectedContacts: ['1'] })

      expect(
        screen.queryByTestId('FormInterviewContactsTags-group')
      ).not.toBeInTheDocument()
    })
  })

  describe('when there are no selected contacts', () => {
    it('hides the tags group', () => {
      arrangeTest({
        availableContacts: AVAILABLE_CONTACTS,
        selectedContacts: []
      })

      expect(
        screen.queryByTestId('FormInterviewContactsTags-group')
      ).not.toBeInTheDocument()
    })
  })

  it('shows selected contacts', async () => {
    arrangeTest({
      availableContacts: AVAILABLE_CONTACTS,
      selectedContacts: ['1', '3']
    })

    expect(screen.getByText('Contact 1')).toBeInTheDocument()
    expect(screen.getByText('Contact 3')).toBeInTheDocument()
  })

  describe('when click the delete button', () => {
    it('removes the skill', async () => {
      arrangeTest({
        availableContacts: AVAILABLE_CONTACTS,
        selectedContacts: ['1', '2']
      })

      expect(screen.getByText('Contact 1')).toBeInTheDocument()
      expect(screen.getByText('Contact 2')).toBeInTheDocument()

      fireEvent.click(
        within(screen.getByTestId('FormInterviewContactsTags-tag-0')).getByRole(
          'button'
        )
      )

      expect(await screen.findByLabelText('Contact 2')).toBeChecked()
      expect(screen.queryByText('Contact 1')).not.toBeInTheDocument()
    })
  })
})
