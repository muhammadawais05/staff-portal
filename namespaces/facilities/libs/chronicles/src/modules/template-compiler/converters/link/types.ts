export type LinkPayload =
  | PerformedActionLinkPayload
  | ModelDescriptionLinkPayload

// As part of "Performed Action" payload from `api/graphql/chronicles`
export interface PerformedActionLinkPayload {
  $type: 'link'
  text: string
  path?: string
  accessible: boolean
  options?: Record<string, string>
}

// https://github.com/toptal/platform/blob/bf999d480a9714c7e7eab54f093b53f0721f9ae3/api/lib/graphql_api/types/model_description/link_type.rb#L6-L12
export interface ModelDescriptionLinkPayload {
  text: string
  path?: string | null
  accessible: boolean
  options?: { name: string; value?: string }[]
}
