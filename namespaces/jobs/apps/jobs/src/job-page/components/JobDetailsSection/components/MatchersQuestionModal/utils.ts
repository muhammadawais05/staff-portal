import { JobPositionQuestionInput } from '@staff-portal/graphql/staff'
import { Question } from '@staff-portal/jobs'

import { GetMatchersQuestionModalDataQuery } from './data/get-matchers-question-modal-data/get-matchers-question-modal-data.staff.gql.types'

export const convertToFormQuestions = (
  positionQuestions: NonNullable<
    GetMatchersQuestionModalDataQuery['node']
  >['positionQuestions']
): Question[] | undefined =>
  positionQuestions?.nodes.map(({ template, ...rest }) => ({
    ...rest,
    jobPositionQuestionTemplateId: template?.id,
    sticky: template?.sticky
  }))

export const convertToApiQuestions = (
  questions: Question[]
): JobPositionQuestionInput[] =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  questions.map(
    ({
      id,
      comment,
      required,
      jobPositionQuestionTemplateId,
      label,
      destroy
    }) => ({
      id,
      comment,
      required,
      jobPositionQuestionTemplateId,
      label: label ?? '',
      destroy: (id && !label) || destroy
    })
  )
