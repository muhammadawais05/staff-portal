import { ClientSocialMediaFragment } from '../SocialMedia/data'
import {
  getCompanyExternalSourceTwitterTooltip,
  getCompanyExternalSourceFacebookTooltip,
  getCompanyExternalSourceZoomUrlTooltip,
  getCompanyExternalSourceLinkedInTooltip,
  getCompanyExternalSourceCrunchbaseTooltip
} from './utils'

describe('CompanyExternalSourceInfoLink utils', () => {
  describe('getCompanyExternalSourceTwitterTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceTwitterTooltip(
        {} as ClientSocialMediaFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceTwitterTooltip({
        twitterLink: {
          text: 'test'
        },
        buyingSignalsService: {
          twitter: {
            text: 'test'
          }
        }
      } as ClientSocialMediaFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceFacebookTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceFacebookTooltip(
        {} as ClientSocialMediaFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceFacebookTooltip({
        facebookLink: {
          text: 'test'
        },
        buyingSignalsService: {
          facebook: {
            text: 'test'
          }
        }
      } as ClientSocialMediaFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceZoomUrlTooltip`', () => {
    it('do not returns tooltip if value exist', () => {
      const result = getCompanyExternalSourceZoomUrlTooltip({
        zoominfoProfileUrl: 'test'
      } as ClientSocialMediaFragment)

      expect(result).toBeNull()
    })

    it('returns tooltip if clientopedia exist and no self value', () => {
      const result = getCompanyExternalSourceZoomUrlTooltip({
        clientopedia: {
          zoominfoUrl: {
            text: 'test'
          }
        }
      } as ClientSocialMediaFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceLinkedInTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceLinkedInTooltip(
        {} as ClientSocialMediaFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceLinkedInTooltip({
        linkedinLink: {
          text: 'test'
        },
        buyingSignalsService: {
          linkedin: {
            text: 'test'
          }
        }
      } as ClientSocialMediaFragment)

      expect(result).not.toBeNull()
    })
  })

  describe('getCompanyExternalSourceCrunchbaseTooltip`', () => {
    it('do not returns tooltip if value not exist', () => {
      const result = getCompanyExternalSourceCrunchbaseTooltip(
        {} as ClientSocialMediaFragment
      )

      expect(result).toBeNull()
    })

    it('returns tooltip if same value and bss', () => {
      const result = getCompanyExternalSourceCrunchbaseTooltip({
        crunchbaseLink: {
          text: 'test'
        },
        buyingSignalsService: {
          crunchbase: {
            text: 'test'
          }
        }
      } as ClientSocialMediaFragment)

      expect(result).not.toBeNull()
    })
  })
})
