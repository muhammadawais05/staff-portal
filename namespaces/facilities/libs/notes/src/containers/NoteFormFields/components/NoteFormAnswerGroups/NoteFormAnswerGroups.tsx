import { SubSection } from '@staff-portal/ui'
import React from 'react'

import { AnswerGroupedType } from '../../../../types'
import NoteFormAnswers from '../NoteFormAnswers'
import NoteFormGroupHeader from '../NoteFormGroupHeader'

export interface Props {
  groupedAnswers: AnswerGroupedType[]
  verticalId?: string
  hideIndex?: boolean
  isEditingExisting?: boolean
}

const NoteFormAnswerGroups = ({
  groupedAnswers,
  verticalId,
  hideIndex = false,
  isEditingExisting
}: Props) => {
  let answerCount = 0

  return (
    <>
      {groupedAnswers.map(({ groupName, groupAnswers }, groupIndex) => {
        if (groupIndex !== 0) {
          answerCount += groupedAnswers[groupIndex - 1].groupAnswers.length
        }

        return (
          <SubSection key={groupName}>
            <NoteFormGroupHeader title={groupName} />

            <NoteFormAnswers
              hideIndex={hideIndex}
              startIndex={answerCount}
              answers={groupAnswers}
              verticalId={verticalId}
              isEditingExisting={isEditingExisting}
            />
          </SubSection>
        )
      })}
    </>
  )
}

export default NoteFormAnswerGroups
