export const getReferralsResponse = () => ({
  data: {
    widgets: {
      referrals: {
        referralSlug: 'book-nothing-but-honorable-web-development-experts',
        referralUrl:
          'https://staging.toptal.net#book-nothing-but-honorable-web-development-experts',
        companySourcingCommission: {
          ratePercent: '1.5',
          __typename: 'RelativeSourcingCommission'
        },
        talentSourcingCommission: {
          ratePercent: '1.5',
          __typename: 'RelativeSourcingCommission'
        },
        recentlyReferredRoles: {
          hasMore: false,
          edges: [],
          __typename: 'RecentlyReferredRoleConnection'
        },
        __typename: 'ReferralsWidget'
      },
      __typename: 'Widgets'
    }
  }
})
