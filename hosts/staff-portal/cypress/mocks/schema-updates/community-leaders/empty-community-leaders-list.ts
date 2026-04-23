const updateCommunityLeadersEmptyListMock = () => {
  cy.stubGraphQLRequests({
    CommunityLeadersAccounts: {
      data: {
        communityLeaderAccounts: {
          totalCount: 0,
          nodes: [],
          __typename: 'CommunityLeaderAccountConnection'
        }
      }
    }
  })
}

export default updateCommunityLeadersEmptyListMock
