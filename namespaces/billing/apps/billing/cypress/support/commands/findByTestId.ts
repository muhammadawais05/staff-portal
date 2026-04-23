/// <reference types="cypress" />

export default (
  subject: Cypress.Chainable,
  id: string,
  ...otherSelectors: string[]
) => {
  const attribValue = id?.indexOf('=') === -1 ? '=' + id : id
  const otherSelectorString = ' ' && otherSelectors.join(' ')

  return subject.find(`[data-testid${attribValue}]${otherSelectorString}`, {
    log: true
  })
}
