import { Engagement, UrlWithMessages } from '@staff-portal/graphql/staff'
import { NodeType } from '@staff-portal/graphql'

export interface RenderProps {
  disabled: boolean
  loading: boolean
  checkLink: () => void
}

export type LinkType = {
  nodeType: NodeType.ENGAGEMENT
  propertyName: keyof Engagement
}

export type GetLazyLinkQuery = {
  node?: { [key: string]: UrlWithMessages }
}

export type GetLazyLinkVariables = LinkType & {
  nodeId: string
}
