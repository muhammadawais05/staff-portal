export const DEFAULT_NET_TERM = { text: `Upon receipt`, value: 0 }

export const getBillingTermsOptions = (netTerms: number[]) => {
  return netTerms.map(netTerm => {
    if (netTerm === 0) {
      return DEFAULT_NET_TERM
    }

    return { text: `Net ${netTerm}`, value: netTerm }
  })
}
