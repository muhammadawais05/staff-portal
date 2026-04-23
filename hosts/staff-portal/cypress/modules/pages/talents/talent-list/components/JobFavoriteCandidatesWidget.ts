export default class JobFavoriteCandidatesWidget {
  get container() {
    return cy.getByTestId('sidebar-widget:job-favorites')
  }
}
