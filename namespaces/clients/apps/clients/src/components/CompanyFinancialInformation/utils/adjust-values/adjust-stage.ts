import { PatchClientProfileInput } from '@staff-portal/graphql/staff'

type Key = keyof Pick<PatchClientProfileInput, 'stage'>

export const adjustStage = ({
  stage
}: Pick<PatchClientProfileInput, 'stage'>): {
  [key in Key]: NonNullable<PatchClientProfileInput['stage']>
} => {
  return { stage: stage || '' }
}
