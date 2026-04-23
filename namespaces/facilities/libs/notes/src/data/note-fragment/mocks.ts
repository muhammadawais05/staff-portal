import { OperationCallableTypes, NoteStatus } from '@staff-portal/graphql/staff'

import { NoteFragment } from './note-fragment.staff.gql.types'

const MOCKED_OPERATION = {
  callable: OperationCallableTypes.ENABLED,
  messages: [],
  __typename: 'Operation'
}

const MOCKED_NOTE_OPERATIONS = {
  removeNote: MOCKED_OPERATION,
  removeNoteAttachment: MOCKED_OPERATION,
  updateNote: MOCKED_OPERATION,
  __typename: 'NoteOperation'
}

const MOCKED_ANSWER = {
  nodes: [],
  __typename: 'NoteAnswersConnection'
}

const MOCKED_SOFT_SKILL_RATINGS = {
  nodes: [],
  __typename: 'SoftSkillRatingConnection'
}

const MOCKED_CREATOR = {
  id: 'test-id',
  webResource: {
    text: 'Juan Sanchez',
    url: 'https://staging.toptal.net/platform/staff/talents/1830142',
    __typename: 'Link'
  },
  __typename: 'TalentPartner'
}

export const createNoteMock = (): NoteFragment => ({
  id: 'test-id',
  comment: 'Test comment',
  attachment: null,
  createdAt: '2021-03-20T09:00:32+03:00',
  status: NoteStatus.ACTIVE,
  title: 'Note title',
  updatedAt: '2021-03-20T09:00:32+03:00',
  newSalesCall: false,
  checklistSalesCall: false,
  answers: MOCKED_ANSWER,
  softSkillRatings: MOCKED_SOFT_SKILL_RATINGS,
  creator: MOCKED_CREATOR,
  operations: MOCKED_NOTE_OPERATIONS,
  __typename: 'Note'
})
