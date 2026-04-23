import { Maybe, EngagementCommitmentEnum } from '@staff-portal/graphql/staff'

type EngagementsType =
  | Maybe<{
      nodes: {
        commitment: EngagementCommitmentEnum
      }[]
    }>
  | undefined

export const getCurrentEngagementCommitment = (
  engagements: EngagementsType
): string | undefined => {
  return engagements?.nodes[0]?.commitment
}
