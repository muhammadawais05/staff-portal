class DetailedListItem {
  getItem(label: string) {
    return cy.getByTestId(`item-field: ${label}`)
  }

  getItemValue(label: string) {
    return this.getItem(label).findByTestId('item-field-value')
  }
}

export default DetailedListItem
