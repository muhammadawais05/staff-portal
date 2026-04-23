class StatusSection {
  getStatus() {
    return cy
      .getByTestId('engagement-status-section')
      .findByTestId('item-field: Status')
      .findByTestId('item-field-value')
  }

  getEstimatedEndDateField() {
    return cy
      .getByTestId('engagement-status-section')
      .findByTestId('item-field: Estimated End Date')
      .findByTestId('item-field-value')
  }

  getEstimatedEndDateInput() {
    return this.getEstimatedEndDateField().find('input')
  }

  getEstimatedEndDateEditButton() {
    return this.getEstimatedEndDateField().findByTestId(
      'EditableField-toggle-button-endDate'
    )
  }
}

export default StatusSection
