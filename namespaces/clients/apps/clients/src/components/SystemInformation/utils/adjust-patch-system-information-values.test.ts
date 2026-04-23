import { adjustPatchSystemInformationValues } from './adjust-patch-system-information-values'

describe('adjustPatchSystemInformationValues', () => {
  it('returns patched values', () => {
    expect(
      adjustPatchSystemInformationValues('howDidYouHear', {
        howDidYouHear: undefined
      })
    ).toEqual({ resetHowDidYouHear: true })

    expect(
      adjustPatchSystemInformationValues('howDidYouHearDetails', {
        howDidYouHearDetails: 'details'
      })
    ).toEqual({ howDidYouHearDetails: 'details' })

    expect(
      adjustPatchSystemInformationValues('interestedIn', {
        interestedIn: undefined
      })
    ).toEqual({ interestedIn: '' })
  })
})
