import * as Types from '@staff-portal/graphql/staff'

export type Contract = {
  checked: boolean
  disabled: boolean
  node: { id: string; title?: Types.Maybe<string> }
}

export type ParentAttributeOption = {
  attribute: string
  checked: Types.ClientParentUpdateCascadingOptions
  disabled: boolean
  hintOrError?: Types.Maybe<string>
}
