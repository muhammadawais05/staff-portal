import { PostedAtRadioOptionValues } from './posted-at-radio-option-values'

export type PostedAtOptions = Exclude<
  PostedAtRadioOptionValues,
  PostedAtRadioOptionValues.NOT_SELECTED
>
