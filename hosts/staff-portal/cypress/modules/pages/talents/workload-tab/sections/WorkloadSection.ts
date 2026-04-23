class WorkloadSection {
  get editAllocatedHoursButton() {
    return cy.get('[aria-label="Edit allocated hours"]')
  }

  get editAllocatedHoursInput() {
    return cy.get('[name="allocatedHours"]')
  }
}

export default WorkloadSection
