import { NoteQuestionKind } from '@staff-portal/graphql/staff'

import { NoteAnswerInputWithKind } from '../../types'

// This helper set up a value to [] in a case when value is null
// Not clear for now how null value happens on Local Storage, but it breaks TagSelector
// Tag Selector crushes a page when value is null
export const transformAnswers = (answers?: NoteAnswerInputWithKind[]) => {
  return answers?.map(answer => {
    if (answer.kind === NoteQuestionKind.MULTIPLE_SKILLS && !answer.value) {
      answer.value = []
    }

    return answer
  })
}
