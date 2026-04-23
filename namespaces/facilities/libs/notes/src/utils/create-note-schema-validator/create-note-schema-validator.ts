import {
  NoteQuestionKind,
  SoftSkillRatingValue
} from '@staff-portal/graphql/staff'
import {
  createSchemaValidator,
  validationObject
} from '@staff-portal/runtime-validation'

const NOTE_ATTACHMENT_SCHEMA = validationObject({
  file: createSchemaValidator({ type: 'mixed', required: true })
})

const NOTE_SOFT_SKILL_RATING_HINT_SCHEMA = validationObject({
  description: createSchemaValidator({ required: true }),
  title: createSchemaValidator({ required: true }),
  value: createSchemaValidator({
    required: true,
    acceptedValues: Object.values(SoftSkillRatingValue)
  })
})

const SOFT_SKILL_SCHEMA = validationObject({
  id: createSchemaValidator({ required: true }),
  name: createSchemaValidator({ required: true }),
  ratingHints: createSchemaValidator({
    type: 'array',
    required: true,
    schemaOf: NOTE_SOFT_SKILL_RATING_HINT_SCHEMA
  })
})

const NOTE_SOFT_SKILL_SCHEMA = validationObject({
  softSkill: SOFT_SKILL_SCHEMA.required(),
  value: createSchemaValidator({
    nullable: true,
    acceptedValues: Object.values(SoftSkillRatingValue)
  }),
  comment: createSchemaValidator({ nullable: true })
})

const NOTE_ANSWER_SCHEMA = validationObject({
  id: createSchemaValidator({ required: true }),
  kind: createSchemaValidator({
    required: true,
    acceptedValues: Object.values(NoteQuestionKind)
  }),
  questionId: createSchemaValidator({ required: true }),
  comment: createSchemaValidator({ nullable: true }),
  optionId: createSchemaValidator({ nullable: true }),
  value: createSchemaValidator({ type: 'mixed', nullable: true })
})

export const createNoteSchemaValidator = () =>
  validationObject({
    noteTitle: createSchemaValidator({ nullable: true }),
    comment: createSchemaValidator({ nullable: true }),
    attachment: createSchemaValidator({
      type: 'array',
      schemaOf: NOTE_ATTACHMENT_SCHEMA,
      nullable: true
    }),
    answers: createSchemaValidator({
      type: 'array',
      schemaOf: NOTE_ANSWER_SCHEMA,
      nullable: true
    }),
    softSkills: createSchemaValidator({
      type: 'array',
      schemaOf: NOTE_SOFT_SKILL_SCHEMA,
      nullable: true
    })
  })
