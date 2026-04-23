import React from 'react'
import { Container } from '@toptal/picasso'
import { Notes, NoteFragment } from '@staff-portal/notes'

import { useTalentCoachingActivitiesContext } from '../TalentCoachingActivities'
import CreateCoachingEngagementNoteForm from '../CreateCoachingEngagementNoteForm'
import CreateGeneralCoachingNoteForm from '../CreateGeneralCoachingNoteForm'

interface Props {
  notes: NoteFragment[]
  refetch: () => void
  talentCoachingEngagementId: string
}

const NotesTab = ({
  talentCoachingEngagementId,
  notes,
  refetch: refetchNotes
}: Props) => {
  const {
    showCreateNoteForm,
    setShowCreateNoteForm,
    showCreateCoachingEngagementNoteForm,
    setShowCreateCoachingEngagementNoteForm
  } = useTalentCoachingActivitiesContext()

  const hideNoteForm = () => setShowCreateNoteForm(false)
  const hideCoachingNoteForm = () =>
    setShowCreateCoachingEngagementNoteForm(false)

  const onNoteCreated = () => {
    hideNoteForm()
    hideCoachingNoteForm()
    refetchNotes()
  }

  return (
    <Container top='small'>
      {showCreateNoteForm && (
        <CreateGeneralCoachingNoteForm
          nodeId={talentCoachingEngagementId}
          onComplete={onNoteCreated}
          onClose={hideNoteForm}
        />
      )}
      {showCreateCoachingEngagementNoteForm && (
        <CreateCoachingEngagementNoteForm
          nodeId={talentCoachingEngagementId}
          onComplete={onNoteCreated}
          onClose={hideCoachingNoteForm}
        />
      )}
      <Notes
        notes={notes}
        refetchNotes={refetchNotes}
        commentRequired={false}
      />
    </Container>
  )
}

export default NotesTab
