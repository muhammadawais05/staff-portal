import { NoteSoftSkillFragment } from '../../data/note-soft-skill-fragment'
import { NoteAnswerInputWithKind, NoteFormType } from '../../types'
import { checkAttachmentFile } from '../check-attachment-file'
import { checkPersistedNoteAnswers } from '../check-persisted-note-answers/check-persisted-note-answers'
import { checkPersistedNoteSoftSkills } from '../check-persisted-note-soft-skills/check-persisted-note-soft-skills'
import { createNoteSchemaValidator } from '../create-note-schema-validator/create-note-schema-validator'
import { validateAndFormatPersistedNote } from './validate-and-format-persisted-note'

jest.mock('../check-attachment-file')
jest.mock('../create-note-schema-validator/create-note-schema-validator')
jest.mock('../check-persisted-note-answers/check-persisted-note-answers')
jest.mock(
  '../check-persisted-note-soft-skills/check-persisted-note-soft-skills'
)

const mockCheckAttachmentFile = checkAttachmentFile as jest.Mock
const mockCheckPersistedNoteAnswers = checkPersistedNoteAnswers as jest.Mock
const mockCheckPersistedNoteSoftSkills =
  checkPersistedNoteSoftSkills as jest.Mock
const mockCreateNoteSchemaValidator = createNoteSchemaValidator as jest.Mock

const formatNote = ({
  areAnswersValid = false,
  areSoftSkillsValid = false,
  isAttachmentValid = false,
  isSchemaNoteValid = false,
  persistedNote,
  answers,
  softSkills
}: {
  areAnswersValid?: boolean
  areSoftSkillsValid?: boolean
  isAttachmentValid?: boolean
  isSchemaNoteValid?: boolean
  persistedNote?: NoteFormType | null
  answers?: NoteAnswerInputWithKind[]
  softSkills?: NoteSoftSkillFragment[]
} = {}) => {
  mockCheckPersistedNoteAnswers.mockImplementation(() => areAnswersValid)
  mockCheckPersistedNoteSoftSkills.mockImplementation(() => areSoftSkillsValid)
  mockCheckAttachmentFile.mockImplementation(() => isAttachmentValid)
  mockCreateNoteSchemaValidator.mockImplementation(() => ({
    isValidSync: () => isSchemaNoteValid
  }))

  return validateAndFormatPersistedNote({ persistedNote, answers, softSkills })
}

describe('formatPersistedNote', () => {
  describe('when persisted note is missing', () => {
    it('returns undefined', () => {
      expect(formatNote()).toBeUndefined()
    })
  })

  describe('when schema is not valid', () => {
    it('returns undefined', () => {
      expect(formatNote({ isSchemaNoteValid: false })).toBeUndefined()
    })
  })

  describe('when answers are not valid', () => {
    it('returns undefined', () => {
      expect(
        formatNote({
          isSchemaNoteValid: true,
          areAnswersValid: false,
          areSoftSkillsValid: true
        })
      ).toBeUndefined()
    })
  })

  describe('when soft skills are not valid', () => {
    it('returns undefined', () => {
      expect(
        formatNote({
          isSchemaNoteValid: true,
          areAnswersValid: true,
          areSoftSkillsValid: false
        })
      ).toBeUndefined()
    })
  })

  describe('when answers and soft skills are valid valid', () => {
    describe('when attachment is not valid', () => {
      it('returns persistent note', () => {
        const COMMENT = 'comment'
        const NOTE_TITLE = 'note tittle'

        expect(
          formatNote({
            isSchemaNoteValid: true,
            areAnswersValid: true,
            areSoftSkillsValid: true,
            persistedNote: { comment: COMMENT, noteTitle: NOTE_TITLE }
          })
        ).toStrictEqual({
          answers: undefined,
          attachment: undefined,
          comment: COMMENT,
          noteTitle: NOTE_TITLE
        })
      })
    })

    describe('when attachment is valid', () => {
      it('returns persistent note', () => {
        const COMMENT = 'comment'
        const NOTE_TITLE = 'note tittle'
        const FILE_NAME = 'file.pdf'
        const FILES = [{ file: {} as File, name: FILE_NAME }]

        const result = formatNote({
          isSchemaNoteValid: true,
          areAnswersValid: true,
          areSoftSkillsValid: true,
          isAttachmentValid: true,
          persistedNote: {
            comment: COMMENT,
            noteTitle: NOTE_TITLE,
            attachment: FILES
          }
        })

        expect(result).toStrictEqual({
          answers: undefined,
          attachment: [
            {
              file: {},
              name: 'file.pdf'
            }
          ],
          comment: 'comment',
          noteTitle: 'note tittle'
        })
      })
    })
  })
})
