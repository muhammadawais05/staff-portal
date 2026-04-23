class History {
  openHistory() {
    cy.getByTestId('history-button').click()
  }
}

export default History
