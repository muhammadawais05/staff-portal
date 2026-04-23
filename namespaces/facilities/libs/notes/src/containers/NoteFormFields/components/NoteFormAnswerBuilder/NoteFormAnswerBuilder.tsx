import { Container, Tooltip } from '@toptal/picasso'
import React from 'react'
import { Link } from '@staff-portal/navigation'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormAnswer from '../NoteFormAnswer'
import NoteFormAnswerComment from '../NoteFormAnswerComment'
import { calculatedGradeLabel } from '../../../../utils'

export interface NoteFormAnswerBuilderProps {
  question: NoteQuestionWithOptionsFragment
  index: number
  verticalId?: string
  value?: unknown
  isEditingExisting?: boolean
  comment?: string | null
}

const NoteFormAnswerBuilder = ({
  question,
  question: { label, group },
  index,
  value,
  verticalId,
  isEditingExisting,
  comment
}: NoteFormAnswerBuilderProps) => {
  // Editing "Future Opportunities" group and "Referred By" field for existing note is not supported
  const isFutureOpportunity =
    isEditingExisting && group.label === 'Future Opportunities'
  const isReferredBy = isEditingExisting && label === 'Referred By'
  const isCalculatedGrade = label === calculatedGradeLabel

  const disabled = isFutureOpportunity || isReferredBy || isCalculatedGrade

  const tooltipContent = isFutureOpportunity ? (
    <>
      Editing Future Opportunities by updating the Sales Call note is not
      supported. You can edit the opportunity in the{' '}
      <Link href='#profile' color='white'>
        Basic Info
      </Link>
    </>
  ) : (
    'This field is not editable in an existing note'
  )

  return (
    <Tooltip
      content={tooltipContent}
      placement='left'
      disableListeners={!disabled}
      interactive
    >
      <Container>
        <NoteFormAnswer
          question={question}
          index={index}
          value={value}
          verticalId={verticalId}
          disabled={disabled}
          comment={comment}
        />

        <NoteFormAnswerComment
          question={question}
          index={index}
          value={comment}
          disabled={disabled}
        />
      </Container>
    </Tooltip>
  )
}

export default NoteFormAnswerBuilder
