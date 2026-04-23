class CommunityLeader {
  protected get section() {
    return cy.getByTestId('talent-community-leader-section')
  }

  get makeCommunityLeader() {
    return this.section.find('button').contains('Set As Community Leader')
  }

  get restoreCommunityLeader() {
    return this.section.find('button').contains('Restore')
  }

  get editCommunityLeader() {
    return this.section.find('button').contains('Edit')
  }

  get removeCommunityLeader() {
    return this.section.find('button').contains('Remove Community Leader')
  }

  get featureCommunityLeader() {
    return this.section.find('button').contains('Mark As Featured')
  }

  get removeFeaturedCommunityLeader() {
    return this.section.find('button').contains('Remove From Featured')
  }

  get rejectCommunityLeaderApplication() {
    return this.section.find('button').contains('Reject Application')
  }

  get approveCommunityLeaderApplication() {
    return this.section.find('button').contains('Approve Application')
  }
}

export default CommunityLeader
