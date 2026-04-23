import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { NoteAnswerInputWithKind, NoteFormType } from '../../types'
import { checkAttachmentFile } from '../check-attachment-file'
import { checkPersistedNoteAnswers } from '../check-persisted-note-answers/check-persisted-note-answers'
import { checkPersistedNoteSoftSkills } from '../check-persisted-note-soft-skills/check-persisted-note-soft-skills'
import { createNoteSchemaValidator } from '../create-note-schema-validator/create-note-schema-validator'
import { transformAnswers } from '../transform-answers'

export const validateAndFormatPersistedNote = ({
  persistedNote,
  answers,
  softSkills
}: {
  persistedNote?: NoteFormType | null
  answers?: NoteAnswerInputWithKind[]
  softSkills?: NoteSoftSkillFragment[]
}): NoteFormType | undefined => {
  if (!persistedNote) {
    return
  }

  const persistedNoteSchemaValidator = createNoteSchemaValidator()
  const isFormValid = persistedNoteSchemaValidator.isValidSync(persistedNote)

  if (!isFormValid) {
    return
  }

  const isAttachmentValid = checkAttachmentFile(persistedNote.attachment)
  const areAnswersValid = checkPersistedNoteAnswers({
    persistedAnswers: persistedNote.answers,
    answers
  })
  const areSoftSkillsValid = checkPersistedNoteSoftSkills({
    persistedSoftSkills: persistedNote.softSkills,
    softSkills
  })

  if (!areAnswersValid || !areSoftSkillsValid) {
    return
  }

  return {
    ...persistedNote,
    noteTitle: persistedNote.noteTitle ?? '',
    comment: persistedNote.comment ?? '',
    attachment: isAttachmentValid ? persistedNote.attachment : undefined,
    answers: transformAnswers(persistedNote?.answers)
  }
}
