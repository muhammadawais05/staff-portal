import { NoteAnswerFragment } from '../../data/note-answer-fragment'

export const getGroupedAnswers = <T extends NoteAnswerFragment>(
  answers: T[]
) => {
  const result = new Map<string, T[]>()

  answers.forEach(answer => {
    const modifiedAnswer = { ...answer }
    const groupName = modifiedAnswer.questionEdge.node.group.label
    const collection = result.get(groupName)

    if (!modifiedAnswer.value?.length) {
      modifiedAnswer.value = undefined
    }

    if (collection) {
      collection.push(modifiedAnswer)
    } else {
      result.set(groupName, [modifiedAnswer])
    }
  })

  return Array.from(result).map(([groupName, groupAnswers]) => ({
    groupName,
    groupAnswers
  }))
}
