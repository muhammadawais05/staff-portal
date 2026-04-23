import { CreateClaimerPostAction, Maybe } from '@staff-portal/graphql/staff'

export type CreateClaimerResult = {
  nextActionName?: Maybe<CreateClaimerPostAction>
  pendingCallbackRequest?: Maybe<{ type?: Maybe<string> }>
  emailTemplate?: Maybe<{ id: string }>
  claimer?: Maybe<{ enterpriseSalesMember: boolean }>
}
