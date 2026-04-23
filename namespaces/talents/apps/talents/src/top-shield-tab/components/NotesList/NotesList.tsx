import React, { useState } from 'react'
import { Container, Button, Section } from '@toptal/picasso'
import { Notes } from '@staff-portal/notes'
import {
  TalentTopShieldFragment,
  CreateGeneralTopShieldNoteForm,
  CreateTopShieldApplicationInterviewNoteForm
} from '@staff-portal/talents-top-shield'
import { Operation } from '@staff-portal/operations'

interface Props {
  talentTopShield: TalentTopShieldFragment | null
  refetch: () => void
}

const NotesList = ({ talentTopShield, refetch }: Props) => {
  const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
  const [showCreateTopShieldNoteForm, setShowTopShieldNoteForm] =
    useState(false)
  const topShieldApplication = talentTopShield?.topShieldApplication
  const notes = topShieldApplication?.notes?.nodes ?? []

  const showNoteForm = () => {
    setShowCreateNoteForm(true)
  }

  const showTopShieldNoteForm = () => {
    setShowTopShieldNoteForm(true)
  }

  const onNoteCreated = () => {
    hideNoteForm()
    refetch()
  }

  const hideNoteForm = () => {
    setShowCreateNoteForm(false)
    setShowTopShieldNoteForm(false)
  }

  const AddNoteButton = () => (
    <Operation
      operation={
        topShieldApplication?.operations.addGeneralTopShieldApplicationNote
      }
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showNoteForm}
          data-testid='addNoteButton'
        >
          Add Note
        </Button>
      )}
    />
  )

  const AddTopShieldApplicationInterviewNoteButton = () => (
    <Operation
      operation={
        topShieldApplication?.operations.addTopShieldApplicationInterviewNote
      }
      render={disabled => (
        <Button
          variant='secondary'
          size='small'
          disabled={disabled}
          onClick={showTopShieldNoteForm}
          data-testid='addTopShieldNoteButton'
        >
          Add Application Interview Note
        </Button>
      )}
    />
  )

  return (
    <Container top='small'>
      <Section
        variant='withHeaderBar'
        title='Notes'
        data-testid='notes-section'
        actions={
          <Container flex>
            <AddNoteButton />
            <AddTopShieldApplicationInterviewNoteButton />
          </Container>
        }
      >
        {topShieldApplication && showCreateNoteForm && (
          <CreateGeneralTopShieldNoteForm
            nodeId={topShieldApplication.id}
            onComplete={onNoteCreated}
            onClose={hideNoteForm}
          />
        )}
        {topShieldApplication && showCreateTopShieldNoteForm && (
          <CreateTopShieldApplicationInterviewNoteForm
            topShieldApplication={topShieldApplication}
            onComplete={onNoteCreated}
            onClose={hideNoteForm}
          />
        )}
        <Notes notes={notes} refetchNotes={refetch} commentRequired={false} />
      </Section>
    </Container>
  )
}

export default NotesList
