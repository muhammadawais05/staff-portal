import { NoteQuestionKind } from '@staff-portal/graphql/staff'

import { NoteAnswerInputWithKind } from '../../types'
import { checkPersistedNoteAnswers } from './check-persisted-note-answers'

describe('checkPersistedNoteAnswers', () => {
  describe('when passing empty arrays', () => {
    it('returns true', () => {
      expect(checkPersistedNoteAnswers({})).toBeTruthy()

      expect(
        checkPersistedNoteAnswers({ answers: [], persistedAnswers: [] })
      ).toBeTruthy()

      expect(checkPersistedNoteAnswers({ persistedAnswers: [] })).toBeTruthy()

      expect(checkPersistedNoteAnswers({ answers: [] })).toBeTruthy()
    })
  })

  describe('when passing arrays with different length', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteAnswers({
          answers: [],
          persistedAnswers: [{} as NoteAnswerInputWithKind]
        })
      ).toBeFalsy()

      expect(
        checkPersistedNoteAnswers({
          answers: [{} as NoteAnswerInputWithKind],
          persistedAnswers: []
        })
      ).toBeFalsy()

      expect(
        checkPersistedNoteAnswers({
          answers: [
            {} as NoteAnswerInputWithKind,
            {} as NoteAnswerInputWithKind
          ],
          persistedAnswers: [{} as NoteAnswerInputWithKind]
        })
      ).toBeFalsy()
    })
  })

  describe('when IDs are not matching', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteAnswers({
          answers: [
            { id: '1' } as NoteAnswerInputWithKind,
            { id: '2' } as NoteAnswerInputWithKind
          ],
          persistedAnswers: [
            { id: '3' } as NoteAnswerInputWithKind,
            { id: '2' } as NoteAnswerInputWithKind
          ]
        })
      ).toBeFalsy()
    })
  })

  describe('when kinds are not matching', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteAnswers({
          answers: [
            {
              id: '1',
              kind: NoteQuestionKind.BUSINESS
            } as NoteAnswerInputWithKind
          ],
          persistedAnswers: [
            {
              id: '1',
              kind: NoteQuestionKind.DATE
            } as NoteAnswerInputWithKind
          ]
        })
      ).toBeFalsy()
    })
  })

  describe('when question IDs are not matching', () => {
    it('returns false', () => {
      expect(
        checkPersistedNoteAnswers({
          answers: [
            {
              id: '1',
              kind: NoteQuestionKind.BUSINESS,
              questionId: '1'
            } as NoteAnswerInputWithKind
          ],
          persistedAnswers: [
            {
              id: '1',
              kind: NoteQuestionKind.BUSINESS,
              questionId: '2'
            } as NoteAnswerInputWithKind
          ]
        })
      ).toBeFalsy()
    })
  })

  describe('when all fields are matching', () => {
    it('returns true', () => {
      expect(
        checkPersistedNoteAnswers({
          answers: [
            {
              id: '1',
              kind: NoteQuestionKind.BUSINESS,
              questionId: '1'
            } as NoteAnswerInputWithKind,
            {
              id: '2',
              kind: NoteQuestionKind.DATE,
              questionId: '2'
            } as NoteAnswerInputWithKind
          ],
          persistedAnswers: [
            {
              id: '1',
              kind: NoteQuestionKind.BUSINESS,
              questionId: '1'
            } as NoteAnswerInputWithKind,
            {
              id: '2',
              kind: NoteQuestionKind.DATE,
              questionId: '2'
            } as NoteAnswerInputWithKind
          ]
        })
      ).toBeTruthy()
    })
  })
})
