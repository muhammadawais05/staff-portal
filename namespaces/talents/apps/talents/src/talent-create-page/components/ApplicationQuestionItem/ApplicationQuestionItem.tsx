import React from 'react'
import {
  ApplicationQuestionKinds,
  ApplicationQuestion
} from '@staff-portal/graphql/staff'
import { Form } from '@toptal/picasso-forms'
import { GridItemField } from '@staff-portal/ui'

import { APPLICATION_ANSWERS_FIELD } from '../../config'

export interface Props {
  question: ApplicationQuestion
}

const ApplicationQuestionItem = ({
  question: { kind, id: questionId, options, requiredForStaff: required, label }
}: Props) => {
  const fieldName = `${APPLICATION_ANSWERS_FIELD}.${questionId}`

  // ApplicationQuestionKinds: [SUGGEST, CUSTOM, MULTIPLE_CHOICE] are not supported currently
  switch (kind) {
    case ApplicationQuestionKinds.TEXT:
      return (
        <GridItemField label={label} labelFor={questionId} required={required}>
          <Form.Input
            id={questionId}
            name={fieldName}
            width='full'
            multiline
            initialValue=''
            allowNull
            rowsMin={4}
            rowsMax={25}
            required={required}
            data-testid='application-question-text'
          />
        </GridItemField>
      )
    case ApplicationQuestionKinds.STRING:
      return (
        <GridItemField label={label} labelFor={questionId} required={required}>
          <Form.Input
            id={questionId}
            name={fieldName}
            width='full'
            initialValue=''
            allowNull
            required={required}
            data-testid='application-question-string'
          />
        </GridItemField>
      )
    case ApplicationQuestionKinds.NUMERIC:
      return (
        <GridItemField label={label} labelFor={questionId} required={required}>
          <Form.NumberInput
            id={questionId}
            name={fieldName}
            width='full'
            initialValue=''
            allowNull
            required={required}
            data-testid='application-question-numeric'
          />
        </GridItemField>
      )
    case ApplicationQuestionKinds.SELECT:
      return (
        <GridItemField label={label} labelFor={questionId} required={required}>
          <Form.Select
            id={questionId}
            name={fieldName}
            width='full'
            allowNull
            initialValue=''
            required={required}
            options={options.nodes.map(({ content }) => ({
              value: content,
              text: content
            }))}
            data-testid='application-question-select'
          />
        </GridItemField>
      )
    case ApplicationQuestionKinds.DATE_PICKER:
      return (
        <GridItemField label={label} labelFor={questionId} required={required}>
          <Form.DatePicker
            id={questionId}
            name={fieldName}
            width='full'
            allowNull
            required={required}
            data-testid='application-question-date-picker'
          />
        </GridItemField>
      )
    default:
      return null
  }
}

export default ApplicationQuestionItem
