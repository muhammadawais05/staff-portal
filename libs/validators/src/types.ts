import { FieldValidator } from '@toptal/picasso-forms'

export type FieldValidators<FieldValue> =
  | FieldValidator<FieldValue>
  | FieldValidator<FieldValue>[]
