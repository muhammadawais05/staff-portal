import { TypedDocumentNode } from '@staff-portal/data-layer-service'
import { NewEngagementWizardAttributes } from '@staff-portal/graphql/staff'

export type NewEngagementWizardQueryData<
  TDocumentNode extends TypedDocumentNode
> = TDocumentNode extends TypedDocumentNode<infer TData, unknown>
  ? TData
  : never

export type NewEngagementWizardQueryVariables<
  TDocumentNode extends TypedDocumentNode
> = TDocumentNode extends TypedDocumentNode<unknown, infer TVariables>
  ? TVariables & { attributes: NewEngagementWizardAttributes }
  : never
