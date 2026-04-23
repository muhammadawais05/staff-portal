import React from 'react'

import { ClientSocialMediaFragment } from '../SocialMedia/data'
import {
  CompanyExternalSourceTooltip,
  CompanyExternalSourceType
} from '../CompanyExternalSourceInfo'

export const getCompanyExternalSourceTwitterTooltip = (
  company: ClientSocialMediaFragment
) => {
  if (!company.twitterLink) {
    return null
  }
  if (
    company.twitterLink?.text === company.buyingSignalsService?.twitter?.text
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }
}

export const getCompanyExternalSourceFacebookTooltip = (
  company: ClientSocialMediaFragment
) => {
  if (!company.facebookLink) {
    return null
  }
  if (
    company.facebookLink?.text === company.buyingSignalsService?.facebook?.text
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }
}

export const getCompanyExternalSourceZoomUrlTooltip = (
  company: ClientSocialMediaFragment
) => {
  if (company.zoominfoProfileUrl) {
    return null
  }
  if (company.clientopedia?.zoominfoUrl?.url) {
    return (
      <CompanyExternalSourceTooltip
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
    )
  }

  return ''
}

export const getCompanyExternalSourceLinkedInTooltip = (
  company: ClientSocialMediaFragment
) => {
  if (!company.linkedinLink) {
    return null
  }
  if (
    company.linkedinLink?.text === company.buyingSignalsService?.linkedin?.text
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }

  if (company.linkedinLink?.text === company.clientopedia?.linkedinUrl?.text) {
    return (
      <CompanyExternalSourceTooltip
        type={CompanyExternalSourceType.CLIENTOPEDIA}
      />
    )
  }

  return ''
}

export const getCompanyExternalSourceCrunchbaseTooltip = (
  company: ClientSocialMediaFragment
) => {
  if (!company.crunchbaseLink) {
    return null
  }
  if (
    company.crunchbaseLink?.text ===
    company.buyingSignalsService?.crunchbase?.text
  ) {
    return <CompanyExternalSourceTooltip type={CompanyExternalSourceType.BSS} />
  }

  return ''
}
