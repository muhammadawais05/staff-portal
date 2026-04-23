import { PatchClientProfileInput } from '@staff-portal/graphql/staff'

export const adjustPatchSystemInformationValues = (
  key: keyof PatchClientProfileInput,
  data?: Partial<PatchClientProfileInput>
) => {
  if (key === 'howDidYouHear' && !data?.howDidYouHear) {
    return {
      resetHowDidYouHear: true
    }
  }

  return {
    [key]: data?.[key] || ''
  }
}
