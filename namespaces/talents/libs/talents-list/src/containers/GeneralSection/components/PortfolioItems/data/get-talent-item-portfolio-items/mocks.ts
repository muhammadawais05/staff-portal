export const createGetTalentPortfolioItemsMock = ({talentId}: { talentId: string }) => ({
  data: {
    node: {
      id: talentId,
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS01NDA0MjA',
        portfolioItems: {
          nodes: [
            {
              id: '223423423',
              coverPhoto: {
                thumbUrl: 'fake-url-thumb-image',
                __typename: 'PortfolioItemCoverImage'
              },
              title: 'Leveraged Buyout Model',
              __typename: 'PortfolioItem'
            }
          ],
          __typename: 'PortfolioItemConnection'
        },
        __typename: 'Profile'
      },
      __typename: 'Talent'
    }
  }
})
