import { Container } from '@toptal/picasso'
import React from 'react'
import { NoteQuestionKind } from '@staff-portal/graphql/staff'

import { NoteQuestionWithOptionsFragment } from '../../../../data/note-answer-fragment'
import NoteFormDatePicker from '../NoteFormDatePicker'
import NoteFormFreelancePlatforms from '../NoteFormFreelancePlatforms'
import NoteFormMultipleSkills from '../NoteFormMultipleSkills'
import NoteFormNumberInput from '../NoteFormNumberInput'
import NoteFormRadioButtons from '../NoteFormRadioButtons'
import NoteFormReferrer from '../NoteFormReferrer'
import NoteFormSelect from '../NoteFormSelect'
import NoteFormSkill from '../NoteFormSkill'
import NoteFormTextBox from '../NoteFormTextBox'
import NoteFormTimeZone from '../NoteFormTimeZone'
import * as S from './styles'

export interface Props {
  question: NoteQuestionWithOptionsFragment
  index: number
  verticalId?: string
  value?: unknown
  disabled?: boolean
  comment?: string | null
}

// eslint-disable-next-line complexity
const NoteFormAnswer = ({
  question,
  index,
  verticalId,
  value,
  disabled,
  comment
}: Props) => {
  const {
    id: questionId,
    kind,
    required,
    hint,
    activeOptions: { nodes: options }
  } = question

  const placeholder = hint ?? undefined

  // Note:
  // NoteQuestionKind: [BUSINESS, INDUSTRY, YEAR] not being used currently
  // NoteQuestionKind: [WEBSITE] is available only for companies
  switch (kind) {
    case NoteQuestionKind.DATE:
      return (
        <NoteFormDatePicker
          required={required}
          index={index}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.INTEGER:
      return (
        <NoteFormNumberInput
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.RADIO_BUTTONS:
      return (
        <NoteFormRadioButtons
          required={required}
          index={index}
          options={options}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.SKILL:
      return (
        <NoteFormSkill
          required={required}
          index={index}
          noteQuestionId={questionId as string}
          verticalId={verticalId as string}
          placeholder={placeholder}
          initialDisplayValue={value as string}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.MULTIPLE_SKILLS:
      return (
        <NoteFormMultipleSkills
          required={required}
          index={index}
          noteQuestionId={questionId as string}
          verticalId={verticalId as string}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.STRING:
      return (
        <NoteFormTextBox
          rows={1}
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.TEXTBOX:
      return (
        <NoteFormTextBox
          rows={6}
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.RADIO_BUTTONS_WITH_SKILL:
      return (
        <Container flex alignItems='center'>
          <NoteFormRadioButtons
            required={required}
            index={index}
            options={options}
            disabled={disabled}
          />

          <Container css={S.inlineSkills}>
            <NoteFormSkill
              name='comment'
              required={required}
              index={index}
              noteQuestionId={questionId as string}
              verticalId={verticalId as string}
              placeholder={placeholder}
              initialDisplayValue={comment || ''}
              disabled={disabled}
            />
          </Container>
        </Container>
      )
    case NoteQuestionKind.TIMEZONE:
      return (
        <NoteFormTimeZone
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.REFERRER:
      return (
        <NoteFormReferrer
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.SELECT:
      return (
        <NoteFormSelect
          required={required}
          index={index}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.FREELANCE_PLATFORMS:
      return (
        <NoteFormFreelancePlatforms
          required={required}
          index={index}
          placeholder={placeholder}
          disabled={disabled}
        />
      )
    case NoteQuestionKind.FILTERED_SKILL:
      return (
        <NoteFormSkill
          required={required}
          index={index}
          noteQuestionId={questionId as string}
          verticalId={verticalId as string}
          placeholder={placeholder}
          initialDisplayValue={value as string}
          disabled={disabled}
        />
      )
    default:
      return <>{kind}</>
  }
}

export default NoteFormAnswer
