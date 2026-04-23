import { TypographyProps } from '@toptal/picasso'

import {
  LinkPayload,
  ModelDescriptionLinkPayload
} from './converters/link/types'

export type PerformedAction = {
  id: string
  occurredAt: string
  action: string
  subjectGID: string
  subjectName: string | null
  performerGID: string | null
  payload: string
  template: string
  comment: string | null
}

// https://github.com/toptal/platform/blob/bf999d480a9714c7e7eab54f093b53f0721f9ae3/api/lib/graphql_api/types/model_description/association_reference_type.rb#L6-L18
export type ModelDescriptionAssociationReference = {
  name: string
  reference: ModelDescriptionLinkPayload | object // possible_types LabelType, LinkType, TemplateType
}

// https://github.com/toptal/platform/blob/bf999d480a9714c7e7eab54f093b53f0721f9ae3/api/lib/graphql_api/types/model_description_type.rb#L8-L27
export type ModelDescription = {
  gid: string
  associationReferences: ModelDescriptionAssociationReference[]
  designation: string
  reference: ModelDescriptionLinkPayload | object // possible_types LabelType, LinkType, TemplateType
}

export type PayloadDataSource = {
  subject?: ModelDescription
  performer?: ModelDescription | string | null
  action?: string
  payload: PayloadValueType | null
  [index: string]: any
}

export type Variable = {
  path: string
  modifier: Modifier | undefined
}

export type TypographyColor = 'green' | 'red' | 'dark-grey' | 'yellow'
export type Typography = {
  kind: 'typography'
  text: string
  color?: TypographyColor
  weight?: TypographyProps['weight']
}
export type Link = {
  kind: 'link'
  href: string
  text: string
  options?: Record<string, string | undefined>
}
export type Literal = string | Typography | Link

export type PrimitivePayloadValueType = string | boolean | number
export type PayloadValueType =
  | PrimitivePayloadValueType
  | LinkPayload
  | Record<string, any>
  | Record<string, any>[]

export type ChangePayloadModifier = 'nolabel' | 'switch'
export type LinkPayloadModifier = 'with_indefinite_article'
export type DatePayloadModifier = 'utc'
export type StringPayloadModifier =
  | 'with_indefinite_article'
  | 'emphasized'
  | 'emphasized_text'
  // In current TS version we can't specify string literal type with regex
  // that's why we have to use `string` type for such modifiers as:
  //    - emphasized(good)
  //    - emphasized(bad)
  //    - emphasized(neutral)
  //    - emphasized(warning)
  //    - emphasized_text(*some_string*, good)
  //    - emphasized_text(*some_string*, bad)
  //    - emphasized_text(*some_string*, neutral)
  //    - emphasized_text(*some_string*, warning)
  | string
export type Modifier =
  | ChangePayloadModifier
  | LinkPayloadModifier
  | DatePayloadModifier
  | StringPayloadModifier

export type EmphasisType = 'good' | 'bad' | 'neutral' | 'warning'

export type InterpolateProps = {
  payload: PayloadValueType | null
  key?: string
  modifier?: Modifier
}
export type ConvertProps = {
  payload: PayloadValueType
  interpolate: (props: InterpolateProps) => Literal[]
  key?: string
  modifier?: Modifier
}
export interface Converter {
  isMatching: (payload: PayloadValueType) => boolean
  convert: (props: ConvertProps) => Literal[]
}
